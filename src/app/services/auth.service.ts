import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatabaseService } from './database.service';

// Importación necesaria para el login de Google
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLogued = false;
  profile: any;

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    public db: DatabaseService,
    public router: Router
  ) {
    this.verifyIsLogued(); //
    
    let storedProfile: any = localStorage.getItem('profile');
    if (storedProfile) {
      this.profile = JSON.parse(storedProfile);
    }
    let stroedUser: any = localStorage.getItem('user');
    if (stroedUser) {
      let user = JSON.parse(stroedUser);
      this.getProfile(user?.uid);
    }
  }

  // --- NUEVA FUNCIÓN: LOGIN CON GOOGLE ---
  async loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await this.auth.signInWithPopup(provider);
      const user = userCredential.user;

      if (user) {
        // 1. Verificar si el documento del usuario ya existe en Firestore
        const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
        
        if (!userDoc?.exists) {
          // 2. SI ES NUEVO: Creamos su perfil inicial en la base de datos
          const newUserProfile = {
            id: user.uid,
            name: user.displayName || 'Músico Independiente',
            email: user.email,
            username: user.email?.split('@')[0] || '', // Genera un username base
            photo: user.photoURL || '',
            role: 'musico', // Rol por defecto para tu proyecto de grado
            fechaRegistro: new Date()
          };
          
          await this.firestore.collection('users').doc(user.uid).set(newUserProfile);
          console.log('Nuevo perfil de músico creado en Firestore');
        }

        // 3. Guardar en LocalStorage y navegar como en tu lógica original
        localStorage.setItem('user', JSON.stringify(user));
        this.isLogued = true;
        this.getProfile(user.uid);
        
        // Redirigimos al perfil para que vea sus datos
        this.router.navigateByUrl('/profile');
      }
      return user;
    } catch (error) {
      console.error('Error en el proceso de Google:', error);
      return null;
    }
  }

  // --- REGISTRO Y LOGIN TRADICIONAL ---
  async registerUser(email: string, password: string, additionalData: { name: string; phone: string; username: string }) {
    try {
      const userCredential: any = await this.auth.createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;
      await this.firestore.collection('users').doc(userId).set(additionalData);
      
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 2000);
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const userCredential: any = await this.auth.signInWithEmailAndPassword(email, password);
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      this.isLogued = true;
      this.getProfile(userCredential.user.uid);
      this.router.navigateByUrl('/profile');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  // --- MÉTODOS DE PERFIL Y ESTADO ---
  verifyIsLogued() {
    let user = localStorage.getItem('user');
    this.isLogued = user ? true : false;
    return this.isLogued;
  }

  getProfile(uid: any) {
    this.db.getDocumentById('users', uid).subscribe(
      (res: any) => {
        localStorage.setItem('profile', JSON.stringify(res));
        this.profile = res;
      },
      (error: any) => { console.error(error); }
    );
  }

  // --- MÉTODOS REQUERIDOS POR CARD COMPONENT ---
  addToList(field: any, uid: any) {
    if (this.profile) {
      if (this.checkIsFavorite(field, uid) === false) {
        if (this.profile[field]) {
          this.profile[field].push(uid);
        } else {
          this.profile[field] = [uid];
        }
      } else {
        this.profile[field] = this.profile[field].filter((e: any) => e !== uid);
      }
      let params: any = {};
      params[field] = this.profile[field];
      this.db.updateFireStoreDocument('users', this.profile.id, params);
    }
  }

  addToFavorites(uid: any) {
    this.addToList('favorites', uid);
  }

  checkIsFavorite(field: any, uid: any) {
    return this.profile && this.profile[field] ? this.profile[field].indexOf(uid) >= 0 : false;
  }

  // --- MÉTODOS DE LUGARES ---
  async addLugar(lugarData: any) {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error('Usuario no autenticado');
      const user = JSON.parse(storedUser);
      const lugarId = this.firestore.createId();
      await this.firestore.collection('lugares').doc(lugarId).set({
        ...lugarData,
        userId: user.uid,
        creadoEn: new Date()
      });
      this.router.navigateByUrl('/lugares');
    } catch (error) {
      console.error('Error al añadir lugar:', error);
    }
  }

  async getReservas(uid: string) {
    const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
    return userDoc?.exists ? (userDoc.data() as any).reservas || [] : [];
  }

  logout() {
    localStorage.clear();
    this.isLogued = false;
    this.profile = null;
    return this.auth.signOut().then(() => {
      this.router.navigateByUrl('/inicio');
    });
  }
}
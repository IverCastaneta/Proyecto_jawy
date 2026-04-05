import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatabaseService } from './database.service';
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
    this.verifyIsLogued();
    this.initProfile();
  }

  private initProfile() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.uid) {
        this.getProfile(user.uid);
      }
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await this.auth.signInWithPopup(provider);
      const user = userCredential.user;

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.isLogued = true;

        const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
        let isNewUser = false;

        if (!userDoc?.exists) {
          // Si no existe en la base de datos, lo creamos y lo marcamos como nuevo
          isNewUser = true;
          const newUser = {
            id: user.uid,
            email: user.email,
            perfilCompleto: false,
            fechaRegistro: new Date()
          };
          await this.firestore.collection('users').doc(user.uid).set(newUser);
        } else {
          // Si ya existe, guardamos su perfil en memoria
          const userData: any = userDoc.data();
          this.profile = userData;
          localStorage.setItem('profile', JSON.stringify(userData));
          
          // Si cerró la app antes de completar el registro, lo forzamos a terminarlo
          if (userData && userData.perfilCompleto === false) {
            isNewUser = true;
          }
        }
        
        // Retornamos el objeto exacto que InicioPage está esperando
        return { user, isNewUser };
      }
      return null;
    } catch (error) {
      console.error('Error en Google Login:', error);
      return null;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.isLogued = true;

        this.db.getDocumentById('users', user.uid).subscribe((res: any) => {
          this.profile = res;
          localStorage.setItem('profile', JSON.stringify(res));
          this.checkOnboarding(res);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async registerUser(email: string, password: string, additionalData: any) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user?.uid;
      
      if (userId) {
        await this.firestore.collection('users').doc(userId).set({
          ...additionalData,
          id: userId,
          perfilCompleto: false
        });
        this.router.navigateByUrl('/login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  private checkOnboarding(userData: any) {
    if (userData?.perfilCompleto === true) {
      this.router.navigateByUrl('/profile');
    } else {
      this.router.navigateByUrl('/informacion-personal');
    }
  }

  verifyIsLogued() {
    this.isLogued = !!localStorage.getItem('user');
    return this.isLogued;
  }

  getProfile(uid: string) {
    this.db.getDocumentById('users', uid).subscribe(
      (res: any) => {
        localStorage.setItem('profile', JSON.stringify(res));
        this.profile = res;
      },
      (error: any) => { console.error(error); }
    );
  }

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

  async addLugar(lugarData: any) {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error('No auth');
      const user = JSON.parse(storedUser);
      const lugarId = this.firestore.createId();
      await this.firestore.collection('lugares').doc(lugarId).set({
        ...lugarData,
        userId: user.uid,
        creadoEn: new Date()
      });
      this.router.navigateByUrl('/lugares');
    } catch (error) {
      console.error(error);
    }
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
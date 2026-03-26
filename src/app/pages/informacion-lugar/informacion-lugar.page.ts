import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-lugar',
  templateUrl: './informacion-lugar.page.html',
  styleUrls: ['./informacion-lugar.page.scss'],
})
export class InformacionLugarPage {
  @ViewChild('fileInput') fileInput!: ElementRef;
  lugarForm: FormGroup;
  
  // Ahora es un arreglo para guardar múltiples imágenes en Base64
  fotosLugar: string[] = [];
  maxFotos: number = 5;

  constructor(private fb: FormBuilder, private router: Router) {
    this.lugarForm = this.fb.group({
      nombreLugar: ['', Validators.required],
      direccion: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoLocal: ['', Validators.required]
    });
  }

  seleccionarFoto() { 
    if (this.fotosLugar.length < this.maxFotos) {
      this.fileInput.nativeElement.click(); 
    }
  }

  // Se modificó para procesar múltiples archivos
  onFileSelected(event: any) {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      // Calculamos cuántos archivos más podemos subir
      const espaciosDisponibles = this.maxFotos - this.fotosLugar.length;
      const archivosAProcesar = Math.min(files.length, espaciosDisponibles);

      for (let i = 0; i < archivosAProcesar; i++) {
        const file = files[i];
        this.procesarImagen(file);
      }
    }
    // Limpiamos el input para permitir subir la misma foto de nuevo si se borró
    this.fileInput.nativeElement.value = '';
  }

  // Función extraída para procesar individualmente cada imagen a Base64
  procesarImagen(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Un poco más de calidad para el carrusel
        let width = img.width;
        let height = img.height;
        if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Añadimos la imagen procesada al arreglo
        this.fotosLugar.push(canvas.toDataURL('image/jpeg', 0.6));
      };
    };
    reader.readAsDataURL(file);
  }

  eliminarFoto(index: number) {
    this.fotosLugar.splice(index, 1);
  }

  siguiente() {
    if (this.lugarForm.valid) {
      // Guardamos el arreglo completo de fotos
      const datosLugar = { ...this.lugarForm.value, fotosLugar: this.fotosLugar };
      const datosPrevios = JSON.parse(localStorage.getItem('temp_registro') || '{}');
      
      localStorage.setItem('temp_registro', JSON.stringify({ ...datosPrevios, ...datosLugar }));
      
      this.router.navigate(['/detalles-lugar']); 
    }
  }
}
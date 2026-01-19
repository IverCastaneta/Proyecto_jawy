import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-artistico',
  templateUrl: './perfil-artistico.page.html',
  styleUrls: ['./perfil-artistico.page.scss'],
})
export class PerfilArtisticoPage {
  @ViewChild('fileInput') fileInput!: ElementRef;
  imagePreview: string | null = null;
  descripcion: string = '';

  constructor(private router: Router) { }

  seleccionarFoto() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      
      img.onload = () => {
        // Creamos un canvas para redimensionar la imagen
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // Tamaño suficiente para una foto de perfil
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Convertimos a Base64 con calidad reducida (0.7)
        // Esto reduce drásticamente el peso del archivo
        this.imagePreview = canvas.toDataURL('image/jpeg', 0.7);
        console.log('Imagen comprimida con éxito');
      };
    };
    reader.readAsDataURL(file);
  }
}

  siguiente() {
    if (this.descripcion) {
      const nuevosDatos = {
        fotoPerfil: this.imagePreview, // Imagen en Base64
        biografia: this.descripcion
      };

      const datosPrevios = JSON.parse(localStorage.getItem('temp_registro') || '{}');
      const registroTotal = { ...datosPrevios, ...nuevosDatos };

      localStorage.setItem('temp_registro', JSON.stringify(registroTotal));
      console.log('Registro completo listo para Firebase:', registroTotal);

      // NAVEGACIÓN AL CIERRE (Finalizar Registro)
      this.router.navigate(['/finalizar-registro']);
    }
  }
}
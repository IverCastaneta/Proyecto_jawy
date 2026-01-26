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
  lugarPreview: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.lugarForm = this.fb.group({
      nombreLugar: ['', Validators.required],
      direccion: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoLocal: ['', Validators.required]
    });
  }

  seleccionarFoto() { this.fileInput.nativeElement.click(); }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600; // Un poco más grande por ser local
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          this.lugarPreview = canvas.toDataURL('image/jpeg', 0.6);
        };
      };
      reader.readAsDataURL(file);
    }
  }

  siguiente() {
    if (this.lugarForm.valid) {
      const datosLugar = { ...this.lugarForm.value, fotoLugar: this.lugarPreview };
      const datosPrevios = JSON.parse(localStorage.getItem('temp_registro') || '{}');
      localStorage.setItem('temp_registro', JSON.stringify({ ...datosPrevios, ...datosLugar }));
      
      this.router.navigate(['/detalles-lugar']); // Próximo paso
    }
  }
}
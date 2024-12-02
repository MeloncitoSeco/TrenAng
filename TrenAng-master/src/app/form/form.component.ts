import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { ServerService } from '../services/api/server.service';
import { HttpClientModule } from '@angular/common/http';
import { TipoTren } from '../clases/tipoTren/tipo-tren';
import { MatSelectModule } from '@angular/material/select';
import router from '../../../server/src/routes/fotoTrenRoutes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatStepperModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})

export class FormComponent implements OnInit {
  listaTipoTrenes: TipoTren[] = [];
  stepperOrientation: Observable<StepperOrientation>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  finalStepFormGroup: FormGroup;
  selectedFile: File | null = null; // Variable para almacenar el archivo seleccionado

  constructor(
    private serverService: ServerService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder
  ) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    // Form groups with validations
    this.firstFormGroup = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    });

    this.secondFormGroup = this.formBuilder.group({
      tren: ['', [Validators.required]],
      modelo: ['', [Validators.required, this.validarModeloTren]],
    });

    this.thirdFormGroup = this.formBuilder.group({
      ubicacion: ['', [Validators.required, this.validarUbicacion]],
    });

    this.finalStepFormGroup = this.formBuilder.group({}); // Paso final
  }

  ngOnInit(): void {
    try {
      if (isPlatformBrowser(this.platformId)) {
        const valor: string | null = sessionStorage.getItem('usuarioNombre');

        if (valor) {
          this.serverService.getTrenTypes().subscribe(
            (data: TipoTren[]) => {
              this.listaTipoTrenes = data.map(
                (item) => new TipoTren(item.tipoTren, item.name)
              );
            },
            (error) => {
              console.error('Error al obtener los tipos de trenes', error);
            }
          );
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        console.warn('sessionStorage no está disponible fuera del navegador.');
      }
    } catch (error) {
      console.error('Se produjo un error al acceder a sessionStorage:', error);
    }
  }

  validarModeloTren(control: AbstractControl): ValidationErrors | null {
    const modelo = control.value;
    const esValido = /^[A-Za-z0-9-]+$/.test(modelo);
    return esValido ? null : { modeloInvalido: true };
  }

  validarUbicacion(control: AbstractControl): ValidationErrors | null {
    const ubicacion = control.value;
    const esValido = /^[A-Z][a-záéíóúüñ ]+$/.test(ubicacion);
    return esValido ? null : { ubicacionInvalida: true };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    // Validar si todos los formularios son válidos
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid &&
      this.selectedFile
    ) {
      // Crear el objeto FormData
      const formData = new FormData();
  
      // Agregar los campos de texto
      formData.append('titulo', this.firstFormGroup.value.titulo);
      formData.append('descripcion', this.firstFormGroup.value.descripcion);
      formData.append('tren', this.secondFormGroup.value.tren);
      formData.append('modelo', this.secondFormGroup.value.modelo);
      formData.append('ubicacion', this.thirdFormGroup.value.ubicacion);
      formData.append('creador', (sessionStorage.getItem('usuarioNombre'))|| '');
  
      // Verificar que el archivo no sea nulo antes de añadirlo
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      } else {
        console.error('No se ha seleccionado un archivo.');
        return; // Termina la ejecución si no hay archivo
      }
  
      // Enviar los datos al servidor
      this.serverService.uploadFormData(formData).subscribe({
        next: (response) => {
          
        },
        error: (error) => {
          console.error('Error al enviar el formulario:', error);
        },
      });
    } else {
      console.error('El formulario no es válido o falta un archivo.');
    }
  }
}
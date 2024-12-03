import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import { ServerService } from '../../services/api/server.service';


@Component({
  selector: 'app-change-password',
  standalone:true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDivider,
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  passwordForm: FormGroup;
  usuario : string = '';

  constructor(private fb: FormBuilder, 
    private router : Router,
    @Inject(ServerService) 
    private serverService: ServerService,
  ) {
    // Inicializar el formulario
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }


  ngOnInit(): void {
    if (typeof window !== 'undefined' && sessionStorage) {
      if ('' == sessionStorage.getItem('usuarioNombre')) {
        console.log('No hay usuario',sessionStorage.getItem('usuarioNombre'));
        this.router.navigate(['/login']);
      }else{
        this.usuario= (sessionStorage.getItem('usuarioNombre'))|| '';
      }
    }
  }

  // Validar si las contraseñas coinciden
  private passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Verificar si un campo es inválido
  isFieldInvalid(fieldName: string): boolean {
    const control = this.passwordForm.get(fieldName);
    return (control?.invalid && (control.dirty || control.touched))?? false;
  }

  // Enviar datos del formulario
  onSubmit() {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;


      this.serverService.updatePassword(this.usuario, currentPassword, newPassword).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          alert('¡Contraseña cambiada exitosamente!');
        },
        error: (error) => {
          console.error('Error al cambiar la contraseña:', error);
          alert('Hubo un problema al cambiar la contraseña.');
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  closeSession(){
    sessionStorage.clear()
      this.router.navigate(['/home']);
  }

}
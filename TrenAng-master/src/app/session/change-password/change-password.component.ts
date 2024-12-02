import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';


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
export class ChangePasswordComponent {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private router : Router) {
    // Inicializar el formulario
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
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

      // Aquí llamarías a un servicio para cambiar la contraseña
      console.log('Contraseña actual:', currentPassword);
      console.log('Nueva contraseña:', newPassword);

      alert('¡Contraseña cambiada exitosamente!');
    }
  }

  closeSession(){
    sessionStorage.clear()
      this.router.navigate(['/home']);
  }

}
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from '../../services/api/server.service';
import { Usuario } from '../../clases/usuario/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ServerService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  respuesta: any[] = [];
  nombreUser:Usuario[]=[];
  loginError: string | null = null;
  signupError: string | null = null;

  constructor(private fb: FormBuilder, @Inject(ServerService) private serverService: ServerService) {}

  ngOnInit() {
    // Aseguramos que sessionStorage esté correctamente inicializado solo en el navegador
    
    if (typeof window !== 'undefined' && sessionStorage) {
      console.log(sessionStorage.getItem('Cuenta') , sessionStorage.getItem('usuarioNombre'));
      if (!sessionStorage.getItem('Cuenta')) {
        console.log(sessionStorage.getItem('Cuenta'));
        sessionStorage.setItem('Cuenta', 'false');
      }
    }

    // Inicializamos los formularios
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const datosUsuario: Pick<Usuario, 'email' | 'password'> = this.loginForm.value;
  
      this.serverService.postIniciarSesion(datosUsuario).subscribe(
        (data) => {
          console.log('Inicio de sesión exitoso:', data);
          sessionStorage.setItem('Cuenta', 'true');
          sessionStorage.setItem('usuarioNombre', data.name); // Almacenar el nombre del usuario
          console.log('Nombre del usuario:', sessionStorage.getItem('usuarioNombre'));
          

        },
        (error) => {
          this.loginError = 'Error al iniciar sesión: ' + (error?.error || error?.message || 'Error desconocido');
          console.error('Error al iniciar sesión:', error);
        }
      );
    } else {
      console.warn('Formulario de inicio de sesión inválido');
    }
  }
  crearCuenta() {
    if (this.signupForm.valid) {
      const datosUsuario: Usuario = this.signupForm.value;

      this.serverService.postCrearCuenta(datosUsuario).subscribe(
        (data) => {
          this.respuesta = data;
          console.log('Cuenta creada exitosamente:', this.respuesta);
          sessionStorage.setItem('Cuenta', 'true');
          sessionStorage.setItem('usuarioNombre', data.name);
          
        },
        (error) => {
          this.signupError = 'Error al crear cuenta: ' + (error.error || error.message);
          console.error('Error al crear cuenta:', error);
        }
      );
    } else {
      console.warn('Formulario de registro inválido');
    }
  }
}
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe, CommonModule} from '@angular/common';
import { ServerService } from '../services/api/server.service';
import { HttpClientModule } from '@angular/common/http';
import { TipoTren } from '../clases/tipoTren/tipo-tren';
import {MatSelectModule} from '@angular/material/select';

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
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})


export class FormComponent implements OnInit {
  trenes : any[] = [];
 listaTipoTrenes : TipoTren[] = [];
  constructor(  http :HttpClientModule, private serverService: ServerService) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.serverService.getTrenTypes().subscribe(
      (data: TipoTren[]) => {
        // Mapea los datos a instancias de TipoTren
        this.listaTipoTrenes = data.map(item => new TipoTren(item.tipoTren, item.nombre));
      },
      (error) => {
        console.error('Error al obtener los tipos de trenes', error);
      }
    );
  }
  
  
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  
}
import { Routes } from '@angular/router';
import { PublicationsComponent } from './forum/publications/publications.component';
import { LoadingPublicationsComponent } from './forum/publications/loading-publications/loading-publications.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'loading-publications', component: LoadingPublicationsComponent},
    {path: 'publications', component: PublicationsComponent},
    {path: 'home', component: MainPageComponent},
    {path: 'form',component:FormComponent},
];

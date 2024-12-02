import { Routes } from '@angular/router';
import { PublicationsComponent } from './forum/publications/publications.component';
import { LoadingPublicationsComponent } from './forum/publications/loading-publications/loading-publications.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './session/login/login.component';
import { DiscusionComponent } from './forum/discusiones/discusion/discusion.component';
import { CloseSessionComponent } from './session/closeSession/close-session/close-session.component';
import { ChangePasswordComponent } from './session/change-password/change-password.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'loading-publications', component: LoadingPublicationsComponent},
    {path: 'publications', component: PublicationsComponent},
    {path: 'home', component: MainPageComponent},
    {path: 'form',component:FormComponent},
    {path: 'login', component:LoginComponent },
    {path: 'foro',component:DiscusionComponent },
    {path: 'close', component:CloseSessionComponent},
    {path: 'cuenta', component:ChangePasswordComponent},
    {path: '**', redirectTo: '/home' }
];

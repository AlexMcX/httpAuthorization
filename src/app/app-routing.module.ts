import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './route/home/home.component';
import { PageNotFoundComponent } from './route/page-not-found/page-not-found.component';
import { LoginComponent } from './route/login/login/login.component';
import { RegistrationComponent } from './route/login/registration/registration.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'reg', component: RegistrationComponent},
  { path: 'settings', loadChildren: './route/settings/settings.module#SettingsModule'},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

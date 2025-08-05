import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
// import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'profile', component: HomeComponent },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'signin', pathMatch: 'full' },
];

import { Routes } from '@angular/router';
import { ActivateAccountComponent } from './features/activate-account/activate-account.component';
import { AuthFormComponent } from './features/auth/auth-form/auth-form.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthFormComponent,
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent,
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

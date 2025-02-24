import { NgClass } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationRequest,
  RegistrationRequest,
} from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-auth-form',
  imports: [FormsModule, NgClass],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  title = input<string>('Login');
  buttonText = input<string>('Login');
  isRegister = input<boolean>(false);
  isRegisterMode = signal(this.isRegister());

  private router = inject(Router);
  private authService = inject(AuthenticationService);
  private tokenService = inject(TokenService);

  authRequest: AuthenticationRequest = { email: '', password: '' };
  registerRequest: RegistrationRequest = {
    email: '',
    firstname: '',
    lastname: 'Mello',
    password: '',
  };
  errorMsg: Array<string> = [];

  login() {
    this.errorMsg = [];
    this.authService
      .authenticate({
        body: this.authRequest,
      })
      .subscribe({
        next: (res) => {
          this.tokenService.token = res.token as string;
          this.router.navigate(['home']);
        },
        error: (err) => {
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg.push(err.error.error);
          }
          console.log(err);
        },
      });
  }

  register() {
    this.errorMsg = [];
    this.authService
      .register({
        body: this.registerRequest,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        },
      });
  }

  toggleRegister() {
    this.isRegisterMode.set(true);
  }

  toggleLogin() {
    this.isRegisterMode.set(false);
  }
}

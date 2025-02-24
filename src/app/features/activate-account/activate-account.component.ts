import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  imports: [NgIf, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
})
export class ActivateAccountComponent {
  private router = inject(Router);
  private authService = inject(AuthenticationService);

  message = '';
  isOkay = true;
  submitted = false;

  private confirmAccount(token: string) {
    this.authService
      .confirm({
        token,
      })
      .subscribe({
        next: () => {
          this.message =
            'Your account has been successfully activated.\nNow you can proceed to login';
          this.submitted = true;
        },
        error: () => {
          this.message = 'Token has been expired or invalid';
          this.submitted = true;
          this.isOkay = false;
        },
      });
  }

  redirectToLogin() {
    this.router.navigate(['auth']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }
}

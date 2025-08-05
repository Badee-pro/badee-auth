import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private http: HttpClient, private router: Router) {}

  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  // Handle form submission
  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const userCredentials = {
      email: this.email.toLowerCase(),
      password: this.password,
    };

    // Call the authentication service
    this.authService.signIn(userCredentials).subscribe({
      next: (response: any) => {
        const token = response.token || response.accessToken;
        if (token) {
          localStorage.setItem('token', token);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Signed in successfully',
          });
          this.router
            .navigateByUrl('/profile')
            .catch((err) => console.error(err));
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Token not received. Something went wrong.',
          });
        }
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Authentication failed. Please try again.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorMessage,
        });
        console.error('Sign-in failed', error);
      },
    });
  }
}

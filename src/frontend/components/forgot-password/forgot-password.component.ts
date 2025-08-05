import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [MessageService],
})
export class ForgotPasswordComponent {
  email = '';
  errorMessage = '';
  successMessage = '';

  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private router = inject(Router);

  // Handle form submission
  onSubmit() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email.';
      return;
    }

    // Send POST request to backend
    this.http
      .post(`${environment.apiBaseUrl}/forgot-password`, { email: this.email })
      .subscribe({
        next: () => {
          this.successMessage =
            'If your email exists in our system, a reset link has been sent.';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/signin']), 1000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to send reset email. Please try again.';
          this.successMessage = '';
          console.error('Forgot password error', err);
        },
      });
  }
}

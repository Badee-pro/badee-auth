import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
  ],

  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  error = '';
  success = '';
  token = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Get token from URL query params
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'] || '';
      if (!this.token) {
        this.error = 'Invalid or missing token.';
      }
    });
  }

  onSubmit() {
    this.error = '';
    this.success = '';

    if (this.form.invalid) {
      this.error = 'Please fill all fields correctly.';
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    if (!this.token) {
      this.error = 'Invalid or missing token.';
      return;
    }

    const body = {
      token: this.token,
      password: this.form.value.password,
    };

    this.http
      .post<{ message: string }>(
        `${environment.apiBaseUrl}/reset-password`,
        body
      )
      .subscribe({
        next: (res) => {
          this.success = res.message || 'Password has been reset successfully.';
          this.error = '';
          this.form.reset();

          // Show success message, then redirect after 3 seconds
          setTimeout(() => {
            this.router.navigate(['signin']);
          }, 1000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to reset password.';
          this.success = '';
        },
      });
  }
}

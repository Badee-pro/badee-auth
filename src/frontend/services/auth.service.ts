import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface AuthResponse {
  accessToken: string;
  user: {
    fullName: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Sign up a new user service
  signUp(data: {
    fullName: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/signup`, data);
  }

  // Sign in an existing user service
  signIn(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/signin`, data);
  }

  // Forgot password service
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/forgot-password`, {
      email,
    });
  }

  // Reset password service
  resetPassword(token: string, password: string) {
    return this.http.post(`${environment.apiBaseUrl}/reset-password`, {
      token,
      password,
    });
  }
}

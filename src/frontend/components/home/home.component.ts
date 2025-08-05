import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  fullName: string | undefined;
  email: string | undefined;
  errorMessage: string | undefined;

  protectedData: any[] = []; // 🔒 Protected data list

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadUserProfile();
    this.loadProtectedData();
  }

  loadUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/signin']);
      return;
    }

    this.http
      .get<{ user: { fullName: string; email: string } }>(
        `${environment.apiBaseUrl}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .subscribe(
        (response) => {
          this.fullName = response.user.fullName;
          this.email = response.user.email;
        },
        (error) => {
          this.errorMessage = 'Error loading profile';
          console.error('Error loading profile', error);
          if (error.status === 401) {
            this.router.navigate(['/signin']);
          }
        }
      );
  }

  loadProtectedData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    this.http
      .get<any[]>(`${environment.apiBaseUrl}/protected-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe(
        (data) => {
          this.protectedData = data;
        },
        (error) => {
          console.error('Error loading protected data', error);
        }
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode'; // Correct import

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('userToken');
  }

  private storeToken(token: string, userType?: string): void {
    localStorage.setItem('userToken', token);
    if (userType) {
      localStorage.setItem('userType', userType);
    }
    this.isLoggedInSubject.next(true);
  }

  private removeToken(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userType');
    this.isLoggedInSubject.next(false);
  }

  decodeUserToken(): any {
    const encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        return decodedToken;
      } catch (error) {
        console.error('Token decoding error:', error);
        this.logout();
        return null;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  logout() {
    this.removeToken();
  }

  loginUser(username: string, password: string): Observable<any> {
    const apiUrl = 'https://dawaa-bcwc.onrender.com/users/login';
    const userData = { username, password };
    return this.http.post<{ token: string, userType: string }>(apiUrl, userData)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.storeToken(response.token, response.userType); // Store user type
          }
        }),
        catchError(this.handleError)
      );
  }

  loginPharmacy(pharmacy_username: string, pharmacy_password: string): Observable<any> {
    const apiUrl = 'https://dawaa-bcwc.onrender.com/pharmacies/login';
    const pharmacyData = { pharmacy_username, pharmacy_password };
    return this.http.post<{ token: string, userType: string }>(apiUrl, pharmacyData)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.storeToken(response.token, response.userType); // Store user type
          }
        }),
        catchError(this.handleError)
      );
  }

  registerUser(formData: any): Observable<any> {
    const apiUrl = 'https://dawaa-bcwc.onrender.com/users/register';
    return this.http.post(apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  registerPharmacy(formData: any): Observable<any> {
    const apiUrl = 'https://dawaa-bcwc.onrender.com/pharmacies/register';
    return this.http.post(apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserType(): string | null {
    return localStorage.getItem('userType');
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Handled Error:', error);
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized: Invalid credentials.';
            break;
          case 403:
            errorMessage = 'Forbidden: Access is denied.';
            break;
          case 404:
            errorMessage = 'Not Found: The requested resource could not be found.';
            break;
          case 500:
            errorMessage = 'Internal Server Error: Please try again later.';
            break;
          case 400:
            if (error.error && error.error.message) {
              if (error.error.message.includes('username')) {
                errorMessage = 'Username already exists.';
              } else if (error.error.message.includes('email')) {
                errorMessage = 'Email already exists.';
              } else {
                errorMessage = error.error.message; // Handle other specific error messages
              }
            }
            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            break;
        }
      }
    }

    return throwError(errorMessage);
  }
}

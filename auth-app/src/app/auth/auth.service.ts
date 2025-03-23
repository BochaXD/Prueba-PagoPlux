import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL del backend
  private http = inject(HttpClient); // Standalone API

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, { email, password })
      .pipe(catchError(this.handleError('login', [])));
  }

  register(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/register`, { email, password })
      .pipe(catchError(this.handleError('register', [])));
  }

  ProceedTransaction(inputData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, inputData);
  }

  GetTransactions(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/${userId}`);
  }

  IsLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

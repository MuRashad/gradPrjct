// src/app/chat-response.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatResponseService {
<<<<<<< HEAD
  private apiUrl = 'https://b2e6-34-145-4-189.ngrok-free.app/api/v1/patients/generate';
=======
  private apiUrl = 'https://fe42-34-80-175-244.ngrok-free.app/api/v1/patients/generate';
>>>>>>> 92ceeb1b314b96c1be62581d914a0f75cc769282

  constructor(private http: HttpClient) { }

  getChatResponse(prompt: string): Observable<any> {
    const body = { prompt };
    return this.http.post<any>(this.apiUrl, body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}


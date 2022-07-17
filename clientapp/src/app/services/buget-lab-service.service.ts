import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequestDto } from '../models/AuthenticationRequestDto';
import { AuthenticationResponseDto } from '../models/AuthenticationResponseDto';

@Injectable({
  providedIn: 'root',
})
export class BugetLabServiceService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  authenticate(
    requestBody: AuthenticationRequestDto
  ): Observable<AuthenticationResponseDto> {
    let url = 'http://localhost:8080/auth/authenticate';
    return this.http.post<AuthenticationResponseDto>(
      url,
      requestBody,
      this.httpOptions
    );
  }
}

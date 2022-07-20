import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequestDto } from '../models/AuthenticationRequestDto';
import { AuthenticationResponseDto } from '../models/AuthenticationResponseDto';
import { URL_ENDPOINT } from './constants/endpoint.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  validateExpiry(requestJwt: String): Observable<Boolean> {
    let url = `${URL_ENDPOINT}/auth/validateTokenExpiry/` + requestJwt;
    return this.http.post<Boolean>(url, null, this.httpOptions);
  }

  authenticate(
    requestBody: AuthenticationRequestDto
  ): Observable<AuthenticationResponseDto> {
    let url = `${URL_ENDPOINT}/auth/authenticate`;
    return this.http.post<AuthenticationResponseDto>(
      url,
      requestBody,
      this.httpOptions
    );
  }
}

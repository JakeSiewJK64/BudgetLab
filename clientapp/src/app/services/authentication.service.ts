import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequestDto } from '../models/AuthenticationRequestDto';
import { AuthenticationResponseDto } from '../models/AuthenticationResponseDto';
import { UserModel } from '../models/UserModel';
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

  getUser(): Observable<UserModel> {
    var jwt = localStorage.getItem('token');
    let url = `${URL_ENDPOINT}/auth/getUser`;
    return this.http.post<UserModel>(url, jwt, this.httpOptions);
  }

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

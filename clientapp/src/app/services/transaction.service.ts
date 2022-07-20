import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDto } from '../models/TransactionDto';
import { URL_ENDPOINT } from './constants/endpoint.constant';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  upsertTransaction(transaction: TransactionDto): Observable<number> {
    const token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token != null ? `Bearer ${token}` : '',
      }),
    };
    return this.http.post<any>(
      `${URL_ENDPOINT}/transaction/upsertTransaction`,
      transaction,
      httpOptions
    );
  }

  getTransactions(): Observable<TransactionDto[]> {
    const token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token != null ? `Bearer ${token}` : '',
      }),
    };
    return this.http.get<TransactionDto[]>(
      `${URL_ENDPOINT}/transaction/getAllTransactions`,
      httpOptions
    );
  }
}

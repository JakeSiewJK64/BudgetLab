import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseDto } from '../models/ExpenseDto';
import { URL_ENDPOINT } from './constants/endpoint.constant';

@Injectable({
  providedIn: 'root',
})
export class ExpenditureService {
  constructor(private http: HttpClient) { }

  deleteExpense(expenseid: number) {
    const token = localStorage.getItem('token');
    var url = `${URL_ENDPOINT}/expense/deleteExpense`;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token != null ? `Bearer ${token}` : '',
      }),
    };
    return this.http.post<any>(url, expenseid, httpOptions);
  }

  saveExpenses(expense: ExpenseDto): Observable<any> {
    const token = localStorage.getItem('token');
    var url = `${URL_ENDPOINT}/expense/upsertExpense`;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token != null ? `Bearer ${token}` : '',
      }),
    };
    return this.http.post<any>(url, expense, httpOptions);
  }

  getExpenseByUserId(userid: number): Observable<ExpenseDto[]> {
    const token = localStorage.getItem('token');
    var url = `${URL_ENDPOINT}/expense/getExpensesByUserId/${userid}`;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token != null ? `Bearer ${token}` : '',
      }),
    };
    return this.http.get<ExpenseDto[]>(url, httpOptions);
  }

  getExpenses(): Observable<ExpenseDto[]> {
    const token = localStorage.getItem('token');
    var url = `${URL_ENDPOINT}/expense/getExpenses`;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token != null ? `Bearer ${token}` : '',
      }),
    };
    return this.http.get<ExpenseDto[]>(url, httpOptions);
  }

  exportExpenseCSV(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    var url = `${URL_ENDPOINT}/expense/exportExpenseCSV/${id}`;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token != null ? `Bearer ${token}` : '',
      }),
    };
    return this.http.get(url, {
      headers: httpOptions.headers,
      responseType: "blob",
      observe: "response",      
    });
  }
}

import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostAuthenticateService {
  @Output() loggedInEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  emitLoggedIn() {
    this.loggedInEmitter.emit(localStorage.getItem('token') != null);
  }

  getLoggedIn() {
    return this.loggedInEmitter;
  }
}

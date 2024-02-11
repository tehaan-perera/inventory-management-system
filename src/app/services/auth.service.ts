import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('isLoggedIn');
    if (token) {
      return false;
    } else {
      return true;
    }
  }

  public logout(): void {
    localStorage.clear();
  }
}

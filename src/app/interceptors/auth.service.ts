import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private userRoleSubject: BehaviorSubject<number | null>;

  constructor() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    const sessionStart = localStorage.getItem('sessionStart');
    const isSessionValid = sessionStart ? this.isSessionValid(parseInt(sessionStart, 10)) : false;

    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!token && isSessionValid);
    this.userRoleSubject = new BehaviorSubject<number | null>(role ? parseInt(role, 10) : null);

    if (!isSessionValid) {
      this.logout();
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUserRole(): Observable<number | null> {
    return this.userRoleSubject.asObservable();
  }

  login(token: string, userId: number, role: number): void {
    const sessionStart = Date.now();
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('userRole', role.toString());
    localStorage.setItem('sessionStart', sessionStart.toString());

    this.isLoggedInSubject.next(true);
    this.userRoleSubject.next(role);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('sessionStart');

    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next(null);
  }

  private isSessionValid(sessionStart: number): boolean {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return (now - sessionStart) < twentyFourHours;
  }

  getUserId(): Observable<number | null> {
    const userId = localStorage.getItem('userId');
    return of(userId ? parseInt(userId, 10) : null);
  }
}
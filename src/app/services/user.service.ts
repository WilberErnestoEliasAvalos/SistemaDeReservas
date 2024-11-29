import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://flowery-caterwauling-echium.glitch.me';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios/user`);
  }

  getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios/admins`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/usuarios/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/usuarios`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/usuarios/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }

  getUserProfile(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/${id}`);
  }

  updateUserProfile(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile/${id}`, user);
  }

  login(loginData: { email: string, password: string }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, loginData);
  }

  getUserId(): Observable<number | null> {
    const userId = localStorage.getItem('userId');
    return of(userId ? parseInt(userId, 10) : null);
  }

  // asignar roles a un usuario
  assignRole(userId: number, rolId: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/usuarios/${userId}/rol`, { rol_id: rolId });
  }

  getUsers2(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios/user`);
  }

  createUser2(user: { nombre: string; email: string; password: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/usuarios`, user);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<{ message: string }> {
    const userId = localStorage.getItem('userId');
    return this.http.put<{ message: string }>(`${this.apiUrl}/usuarios/${userId}/change-password`, { currentPassword, newPassword });
  }
}

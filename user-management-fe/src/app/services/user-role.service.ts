import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRole } from '../models/user-role.model';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private readonly apiUrl = 'http://localhost:8080/user/roles';

  constructor(private http: HttpClient) {}

  getAllUserRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(this.apiUrl);
  }

  getUserRoleById(id: number): Observable<UserRole> {
    return this.http.get<UserRole>(`${this.apiUrl}/${id}`);
  }

  getUsersByRole(role: string): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.apiUrl}/byRole/${role}`);
  }

  getUserRolesByUserId(userId: number): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.apiUrl}/userById/${userId}`);
  }

  getUserRolesByUserName(userName: string): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.apiUrl}/userByUserName/${userName}`);
  }

  createUserRole(userRole: UserRole): Observable<UserRole> {
    return this.http.post<UserRole>(this.apiUrl, userRole);
  }

  updateUserRole(id: number, updatedUserRole: UserRole): Observable<UserRole> {
    return this.http.put<UserRole>(`${this.apiUrl}/${id}`, updatedUserRole);
  }

  deleteUserRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

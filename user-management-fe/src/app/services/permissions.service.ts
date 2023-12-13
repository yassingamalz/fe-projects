import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private apiUrl = 'http://localhost:8080'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAllPermissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/permissions`);
  }

  getPermissionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/permissions/${id}`);
  }

  createPermission(permission: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/permissions`, permission);
  }

  updatePermission(id: number, updatedPermission: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/permissions/${id}`, updatedPermission);
  }

  deletePermission(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/permissions/${id}`);
  }
}

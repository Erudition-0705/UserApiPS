import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Fetch user by ID
  // getUserById(id: number): Observable<User> {
  //   return this.http.get<User>(`${this.apiUrl}/${id}`);
  // }

  // Fetch user by ID
getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/${id}`, { params: { id: id.toString() } });
}


  // Fetch sorted users by age
  getSortedUsers(ascending: boolean): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/sorted`, { params: { ascending: ascending.toString() } });
  }

}

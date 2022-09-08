import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  get(query:any):Observable<any[]> {
    return this.http.get<any[]>('http://localhost:1337/users/1');
  }
  update(user:any):Observable<any[]> {
    return this.http.put<any[]>(`http://localhost:1337/users/1`,user);
  }
}

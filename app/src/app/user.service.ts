import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';

import * as qs from 'qs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(query: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/users/1`);
  }

  update(user: any): Observable<any[]> {
    return this.http.put<any[]>(`${environment.API_URL}/users/1`, user);
  }

  registerUser(mailaddress: string, password: string) {
    const data = {
      username: mailaddress,
      email: mailaddress,
      password: password,
    }

    return this.http.post<any>(`${environment.API_URL}/auth/local/register`, data);
  }

  login(loginUser: any) {
    const data = {
      identifier: loginUser.username,
      password: loginUser.password,
    }

    return this.http.post<any>(`${environment.API_URL}/auth/local/`, data)
      .pipe(
        catchError(this.handleError)
      );;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

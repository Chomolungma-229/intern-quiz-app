import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as qs from 'qs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuestions(query: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/questions?${qs.stringify(query)}`);
  }
  getRandomQuestion(query: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/questions/random?${qs.stringify(query)}`);
  }
  getSelectLanguage(query: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/languages`);
  }
}

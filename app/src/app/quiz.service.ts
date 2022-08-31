import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  getQuestions(query: any):Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:1337/questions?${qs.stringify(query)}`);
  }
  getRandomQuestion(query: any):Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:1337/questions/random?${qs.stringify(query)}`);
  }
  getSelectLanguage(query: any):Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:1337/languages`);
  }
}

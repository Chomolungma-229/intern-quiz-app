import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as qs from 'qs';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {

  constructor(private http: HttpClient) { }

  registerQuestionAnswer(query: any) {
    const token = localStorage.getItem('token');
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    const options = { headers: headerOptions };
    console.log(options);
    return this.http.post<any>(`${environment.API_URL}/question-answers`, query, options)
      .pipe(
        map(data => data),
        catchError(this.handleError));;
  }

  getQuestionAnswer(query: any) {
    return this.http.get<any[]>(`${environment.API_URL}/question-answers?${qs.stringify(query)}`);
  }

  getCorrectAnswerRate(questionAnswers: any) {
    const correctNum = Array(7).fill(0);
    const questionNum = Array(7).fill(0);
    const correctAnswerRate = Array(7).fill(0);
    const today = dayjs();
    if (questionAnswers) {
      //questionAnswerのisCorrectがTrueかfalseかをとる。trueの数をカウントしてquestionAnswerの数で割る。割った値を返す。
      questionAnswers.forEach((questionAnswer: any, index: number) => {
        const dailyDifference = today.diff(questionAnswer.answer_at, 'day');
        if (questionAnswer.is_correct) {
          correctNum[dailyDifference] += 1;
          questionNum[dailyDifference] += 1;
        } else {
          questionNum[dailyDifference] += 1;
        }
      })
      correctNum.forEach((answerRate, index) => {
        if (answerRate) {
          correctAnswerRate[index] = 100 * correctNum[index] / questionNum[index];
        } else {
          correctAnswerRate[index] = answerRate;
        }
      })
    }
    return correctAnswerRate.reverse();
  }

  protected handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }

}

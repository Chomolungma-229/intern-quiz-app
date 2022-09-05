import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Language } from 'src/app/model/language';
import { QuizService } from 'src/app/quiz.service';


@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  languages:Language[] = [];

  constructor(private quizservice:QuizService, private router: Router) { }

  ngOnInit(): void {
    const query = {
    }
    this.quizservice.getSelectLanguage(query).subscribe(languages => console.log(languages));
    this.quizservice.getSelectLanguage(query).subscribe(
      ((language: Language[]) => {
        this.languages = language;
        })
      );

  }

  toQuiz(languageId: number){
    this.router.navigate(
      ['/quiz'],
      {
        queryParams:
        {
          id: languageId
        }
      }
    );
  }

}

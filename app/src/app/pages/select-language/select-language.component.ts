import { Component, OnInit } from '@angular/core';

import { QuizService } from 'src/app/quiz.service';


@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  constructor(private quizservice:QuizService) { }

  ngOnInit(): void {
    const query = {
    }
    this.quizservice.getSelectLanguage(query).subscribe(languages => console.log(languages));


  }

}

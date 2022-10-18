import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { DialogComponent } from '../dialog/dialog.component';
import { QuizService } from 'src/app/quiz.service';
import { choice } from 'src/app/model/question';
import { UserService } from 'src/app/user.service';
import { QuestionAnswerService } from 'src/app/question-answer.service';
import * as dayjs from 'dayjs';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questions: any;
  user: any;
  languageOrder: any;
  choice: choice[] = [];

  constructor(
    public dialog: MatDialog,
    private quizservice: QuizService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userSvc: UserService,
    private answerSvc: QuestionAnswerService,
  ) { }

  ngOnInit(): void {
    const query = {
      language: 4
    }
    this.activatedRoute.queryParams.pipe().subscribe(
      params => {
        query.language = params['id'];
        this.languageOrder = params['index'];
      }
    );

    this.quizservice.getRandomQuestion(query).subscribe(questions => this.questions = questions);
    this.userSvc.get(1).subscribe(user => { this.user = user; console.log(this.user) });
  }

  openDialog(choiceNum: number): void {
    console.log(this.questions, choiceNum);
    const answerData = {
      users_permissions_user: this.user.id,
      is_correct: this.questions.choices[choiceNum].is_correct,
      question: this.questions.id,
      answer_at: dayjs(),
    };
    console.log(answerData.users_permissions_user, answerData.question);
    this.answerSvc.registerQuestionAnswer(answerData).subscribe(answer => {
      console.log(answer);
    });

    if (this.questions.choices[choiceNum].is_correct) {
      this.user.Correct_Language[this.languageOrder].correct_num += 1;
      this.userSvc.update(this.user).subscribe(user => { console.log(user) });
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { question: this.questions, user: this.user, choiceNum: choiceNum, languageOrder: this.languageOrder },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  toHome() {
    this.router.navigate(
      ['/home']
    )
  }
}

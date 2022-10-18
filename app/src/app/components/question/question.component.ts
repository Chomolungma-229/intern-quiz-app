import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { DialogComponent } from '../dialog/dialog.component';
import { QuizService } from 'src/app/quiz.service';
import { choice } from 'src/app/model/question';
import { UserService } from 'src/app/user.service';
import { QuestionAnswerService } from 'src/app/question-answer.service';
import { StorageService } from 'src/app/storage.service';
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
    private quizSvc: QuizService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userSvc: UserService,
    private answerSvc: QuestionAnswerService,
    private storageSvc: StorageService
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

    this.user = JSON.parse(this.storageSvc.getStorage('user') || '{}');
    this.quizSvc.getRandomQuestion(query).subscribe(questions => this.questions = questions);
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
    });
    if (this.questions.choices[choiceNum].is_correct) {
      this.user.correct_language[this.languageOrder].correct_num += 1;
      this.userSvc.update(this.user).subscribe();
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { question: this.questions, user: this.user, choiceNum: choiceNum, languageOrder: this.languageOrder },
      // disableClose: true
    });

  }

  toHome() {
    this.router.navigate(
      ['/home']
    )
  }
}

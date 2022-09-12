import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { DialogComponent } from '../dialog/dialog.component';
import { QuizService } from 'src/app/quiz.service';
import { choice } from 'src/app/model/question';
import { UserService } from 'src/app/user.service';

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
  choice: choice[] = [];

  constructor(
    public dialog: MatDialog,
    private quizservice: QuizService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    const query = {
      language: 4
    }
    this.activatedRoute.queryParams.pipe().subscribe(
      params => {
        query.language = params['id'];
        console.log(params['id']);
      }
    );

    this.quizservice.getRandomQuestion(query).subscribe(questions => this.questions = questions);
    this.quizservice.getRandomQuestion(query).subscribe(questions => console.log(questions));
    this.userSvc.get(1).subscribe(user => { this.user = user });
  }

  openDialog(choice_num: number): void {
  openDialog(choiceNum: number): void {
    if(this.questions.choices[choiceNum].is_correct){
      this.user.Correct_Language[this.languageOrder].correct_num += 1;
      this.userSvc.update(this.user).subscribe(user => {console.log(user)});
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { question: this.questions, choiceNum: choice_num, user: this.user},
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  toHome(){
    this.router.navigate(
      ['/home']
    )
  }

}

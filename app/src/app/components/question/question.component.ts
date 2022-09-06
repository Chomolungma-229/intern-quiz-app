import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { DialogComponent } from '../dialog/dialog.component';
import { QuizService } from 'src/app/quiz.service';
import { choice } from 'src/app/model/question';

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
  choice: choice[] = [];

  constructor(
    public dialog: MatDialog,
    private quizservice: QuizService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  openDialog(choice_num:number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

    this.router.navigate(
      ['/dialog'],
      {
        queryParams:
        {
          id: 3
        }
      }
    );
  }

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

    this.quizservice.getRandomQuestion(query).subscribe(questions => console.log(questions));
    this.quizservice.getRandomQuestion(query).subscribe(questions => this.questions = questions);
  }


}

import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';
import { QuizService } from 'src/app/quiz.service';

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

  questions:any;

  constructor(public dialog: MatDialog, private quizservice:QuizService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  ngOnInit(): void {
    const query = {
      language: 4
    }

    this.quizservice.getRandomQuestion(query).subscribe(questions => console.log(questions));
    this.quizservice.getRandomQuestion(query).subscribe(questions => this.questions = questions);
  }
}

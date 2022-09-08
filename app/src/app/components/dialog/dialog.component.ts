import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  user: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.data.question.choices[this.data.choiceNum].is_correct)
    {
      this.data.user.Correct_Language[0].correct_num += 1;
    }
    console.log(this.data.user.Correct_Language);
  }

  toSelectLang() {
    this.router.navigate(
      ['/selectlanguege']
    )
    this.dialogRef.close();
  }

}

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
  }

  toSelectLang() {
    this.router.navigate(
      ['/selectlanguege']
    )
    this.dialogRef.close();
  }

  toQuiz(){
    this.router.navigate(
      ['/quiz']
    );
    window.location.reload();
    this.dialogRef.close();
  }

}

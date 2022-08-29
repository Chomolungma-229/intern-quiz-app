import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  username = new FormControl('', [Validators.required, Validators.requiredTrue,]);
  password = new FormControl('some value',[Validators.required, Validators.requiredTrue,]);

  constructor() { }

  ngOnInit(): void {
  }

}

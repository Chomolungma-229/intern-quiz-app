import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  hide = true;

  constructor(
    private router: Router,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
  }
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  registerUser() {
    this.userSvc.registerUser('atsuumi@gmail.com', '1234567')
      .subscribe((
        response => { console.log(response) }
      ));
  }

  // toLogin() {
  //   this.router.navigate(
  //     ['/login']
  //   )
  // }
}

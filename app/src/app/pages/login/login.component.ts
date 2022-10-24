import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'dayjs/locale/ja';
import * as dayjs from 'dayjs';

import { UserService } from 'src/app/user.service';
import { StorageService } from 'src/app/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  user: any;
  userdata: any;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private userSvc: UserService,
    private storageSvc: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.userSvc.login(this.loginForm.value)
      .subscribe((
        response => {
          console.log(response);
          localStorage.setItem('token', response.jwt);
          this.lostStarNum(response);
          this.userSvc.update(response.user).subscribe(loginUser => {
            this.storageSvc.setStorage(loginUser);
            this.router.navigate(
              ['/home']
            )
          });
        }
      ));
  }

  getPassword() {
    return this.loginForm.get('password');
  }

  lostStarNum(loginUser: any) {
    let correntNum: any[] = [];
    let mostCorrectLangId = 0;
    let mostCorrectNum = 0;

    for (let i = 0; i < loginUser.user.Correct_Language.length; i++) {

      correntNum[i] = loginUser.user.Correct_Language[i].correct_num;

      if (mostCorrectNum < correntNum[i]) {
        mostCorrectLangId = i;
        mostCorrectNum = correntNum[i];
      }
    }
    loginUser.user.Correct_Language[mostCorrectLangId].correct_num -= dayjs().diff(loginUser.user.Last_Login_At, 'day') * 4;
    loginUser.user.Last_Login_At = dayjs();
  }

}

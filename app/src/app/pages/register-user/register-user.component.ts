import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinValidator } from '@angular/forms';

import { Router } from '@angular/router';
import { LanguageService } from 'src/app/language.service';
import { UserService } from 'src/app/user.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  hide = true;
  language: any[] = [];
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private router: Router,
    private userSvc: UserService,
    private languageSvc: LanguageService,
    private storageSvc: StorageService
  ) { }

  ngOnInit(): void {

  }

  registerUser() {
    this.languageSet();

    this.userSvc.registerUser(this.signupForm.value)
      .subscribe(response => {
        //ユーザのデータ持って来る、Correct_Languageの中身を書き換える、ユーザの情報をアップデートする
        response.user.Correct_Language = this.language;
        this.userSvc.update(response.user).subscribe(
          loginUser => {
            this.storageSvc.setStorage(loginUser);
            this.router.navigate(
              ['/home']
            )
          });
      })
  }

  languageSet() {
    this.languageSvc.getLanguage(1).subscribe(
      language => {
        for (let i = 0; i < language.length; i++) {
          this.language[i] = {
            //繰り返し処理でthis.languageの配列にlanguageとcorrect_numを一つずつ入れる
            Language: language[i],
            correct_num: 0
          }
        }
        console.log(this.language);
      }
    )
  }
}

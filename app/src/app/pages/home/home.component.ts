import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'dayjs/locale/ja';
import * as dayjs from 'dayjs';

import { UserService } from 'src/app/user.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  starResults: any[] = [];

  constructor(
    private router: Router,
    private userSvc: UserService,
    private storageSvc: StorageService
  ) { }

  ngOnInit(): void {
    let loginUser: any = JSON.parse(this.storageSvc.getStorage('user') || '{}');
    console.log(loginUser);
    this.userSvc.get(loginUser.id).subscribe(user => {
      this.user = user;

      let correntNum = 0;
      let starNum: any[] = [];

      for (let i = 0; i < this.user.Correct_Language.length; i++) {

        correntNum = this.user.Correct_Language[i].correct_num;
        starNum[i] = Math.floor(correntNum / 4);
      }
      console.log(this.user);
      for (let i = 0; i < this.user.Correct_Language.length; i++) {
        this.starResults.push(
          {
            id: this.user.Correct_Language[i].Language.program_language,
            star: this.arrayNumberLength(starNum[i])
          })
      }


    });

  }

  toSelectLang() {
    this.router.navigate(
      ['/selectlanguege']
    )
  }

  arrayNumberLength(number: number): any[] {
    const array: any[] = [];

    if (number == 0) {
      return array;
    } else {
      for (let i = 0; i < number; i++) {
        array.push(i);
      }

      return array;
    }
  }

}

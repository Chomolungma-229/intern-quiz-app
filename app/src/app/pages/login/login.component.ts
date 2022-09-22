import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  username = new FormControl('', [Validators.required,]);
  password = new FormControl('', [Validators.required,]);

  constructor(
    private userSvc: UserService,
    private storageSvc: StorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userSvc.get(1).subscribe(user => { this.user = user; console.log(this.user);} );

  }

  login() {

    this.storageSvc.setStorage(this.user);
    this.router.navigate(
      ['/home']
    )
    // this.user.Correct_Language[this.languageOrder].correct_num += 1;
    // this.userSvc.update(this.user).subscribe(user => {console.log(user)});

  }

}

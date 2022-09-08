import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/user.service';

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

  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userSvc.get(1).subscribe(user => { this.user = user });
  }

  login() {
    this.userdata = {
      name: this.user.username,
    };
    localStorage.setItem('user', JSON.stringify(this.userdata));
    this.router.navigate(
      ['/home'],
      {
        queryParams:
        {
          user: JSON.stringify(this.userdata)
        }
      }
    )
    // this.user.username = 'konosuke';
    this.userSvc.update(this.userdata).subscribe(user => {console.log(user)});
  }

}

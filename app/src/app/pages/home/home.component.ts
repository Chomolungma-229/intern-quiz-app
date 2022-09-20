import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  starNum: any[] = [];

  constructor(private router: Router, private userSvc: UserService) { }

  ngOnInit(): void {
    this.userSvc.get(1).subscribe(user => {
      this.user = user;

      let correntNum = 0;

      for(let i = 0; i < this.user.Correct_Language.length; i++){
        correntNum = this.user.Correct_Language[i].correct_num;

        this.starNum.push(
          {
            id: this.user.Correct_Language[i].Language.program_language,
            star: this.arrayNumberLength(Math.floor(correntNum / 4))
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
    const array:any[] = [];

    if(number == 0){
      return array;
    }else{
      for(let i = 0; i < number; i++){
        array.push(i);
      }

    return array;
    }
  }

}

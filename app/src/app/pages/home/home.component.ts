import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe().subscribe(
      params => {
        this.user = params['user'];
        console.log(this.user);
      }
    );

  }

  toSelectLang() {
    this.router.navigate(
      ['/selectlanguege'],
      {
        queryParams:
        {
          user: JSON.stringify(this.user)
        }
      }
    )
  }

}

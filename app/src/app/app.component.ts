import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hiddenPath: string[] = ['login', 'signup'];
  hidden: boolean = false;
  constructor(
    public router: Router,
  ) { }
  ngOnInit() {
    this.router.events.pipe(
      filter(f => f instanceof NavigationEnd)
    )
      .subscribe((s: any) => {
        this.hidden = this.hiddenPath.some(e => s.url.includes(e));
      });
  }
}

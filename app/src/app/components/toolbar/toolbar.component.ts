import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  hiddenPath: string[] = ['login', 'register-user'];
  hidden: boolean = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(f => f instanceof NavigationEnd)
    )
      .subscribe((s: any) => {
        this.hidden = this.hiddenPath.some(e => s.url.includes(e));
      });
  }

}

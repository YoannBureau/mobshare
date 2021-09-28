import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event)
      )
      .subscribe((event: any) => {
        switch (event.url) {
          case "/":
            this.titleService.setTitle("MobShare");
            break;
          case "/session":
            this.titleService.setTitle("MobShare Timer");
            break;
          default:
            break;
        }
      });
  }
}

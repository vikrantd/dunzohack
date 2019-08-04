import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ShoppinPal';
  currentRoute: string = '';
  public subscription: Subscription;

  constructor(
    private _router: Router,
    private _cdref: ChangeDetectorRef
  ) {
    this.subscription = this._router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        let urlArray = event.urlAfterRedirects.split('/');
        if(urlArray[1] !== undefined) this.currentRoute = urlArray[1];
        this._cdref.detectChanges();
      }
    });
  }

  ngOnit() {
    
  }

  get showFlag() {
    return this.currentRoute == 'login' || this.currentRoute.indexOf('login') != -1 ? false : true;
  }
}

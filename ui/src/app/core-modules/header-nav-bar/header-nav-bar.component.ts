
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AppStoreService } from '../app-store/state/app-store.service';

@Component({
  selector: 'header-nav-bar',
  templateUrl: './header-nav-bar.component.html',
  styleUrls: ['./header-nav-bar.component.scss']
})

export class HeaderNavBarComponent implements OnInit {
  ngUnsubscriber: Subject<any> = new Subject<any> ();
  model: any = {};
  userName: string;
  searchInput: string;

  constructor(private _router: Router,
    private _appSvc: AppStoreService) { 
    this.userName = 'ATeam';
    if(this.userName !== null) this.userName = this.userName.replace(/^"(.*)"$/, '$1');;
  }
 
  ngOnInit() {
    this._appSvc.sGetRouterUrl().takeUntil(this.ngUnsubscriber).subscribe( url => {if(url !== '' && url !== undefined)this._router.navigate([url])});
  }

  search(pValue) {
    this._appSvc.dSearchTerm(pValue);
  }

  logout() {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserToken');
      localStorage.removeItem('environmentReady');
      this._appSvc.dSetRouterUrl('login');
      this._appSvc.dResetStore();
  }

  home() {
    this._appSvc.dSetRouterUrl('home');
  }

  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }
  
}

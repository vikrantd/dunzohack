
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

import { UserService } from '../state/user.services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  model: any = {};
  signUpForm: boolean;
  ngUnsubscriber: Subject<any> = new Subject<any> ();

  constructor(private _userSvc: UserService,
    private _router: Router) { }

  ngOnInit() {
    this._userSvc.sGetRouterUrl().takeUntil(this.ngUnsubscriber).subscribe( url => {if(url !== '') {
      this._router.navigate([url]); }});
      this._userSvc.sGetSignUpState().takeUntil(this.ngUnsubscriber).subscribe( flag => this.signUpForm = flag);
  }

  login() {
    this._userSvc.dLoginUser(this.model);
  }

  signUp(pValue) {
    this._userSvc.dSetSignUpState(pValue);
  }

  signUpUser() {
    this._userSvc.dSignUpUser(this.model);
  }

  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }
}

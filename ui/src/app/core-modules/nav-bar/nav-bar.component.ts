
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { navBarOptions } from './nav-bar.config';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  @Input() routeUrl: string;

  constructor(
    private _router: Router) { 
  }
 
  ngOnInit() {
  }

  selectNavigation(pValue) {
      this._router.navigate([pValue.routerUrl]);
  }

  get navBarOptions () {
      return navBarOptions;
  }
}

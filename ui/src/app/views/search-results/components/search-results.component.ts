
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { AppStoreService } from '../../../core-modules/app-store/state/app-store.service';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements OnInit {
  ngUnsubscriber: Subject<any> = new Subject<any> ();
  searchResults: any[] = [];
  searchTerm: string;

  constructor(private _appSvc: AppStoreService) { 
    
  }
 
  ngOnInit() {
    this._appSvc.sGetSearchResults().takeUntil(this.ngUnsubscriber).subscribe( result => this.searchResults = result);
    this._appSvc.sGetSearchTerm().takeUntil(this.ngUnsubscriber).subscribe( term => this.searchTerm = term);
  }
  traverseBack() {
    this._appSvc.dTraverseBackFromSearch()
  }

  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }
}

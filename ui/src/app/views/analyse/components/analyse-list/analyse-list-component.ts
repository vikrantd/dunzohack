
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

import { AppStoreService } from '../../../../core-modules/app-store/state/app-store.service';
import { AnalyseViewService } from '../../state/analyse.service';

@Component({
  selector: 'analyse-list',
  templateUrl: './analyse-list.component.html',
  styleUrls: ['./analyse-list.component.scss']
})

export class AnalyseListComponent implements OnInit {
  ngUnsubscriber: Subject<any> = new Subject<any> ();
  imageList: any[];
  selectedImage: any;
  addCategoryFlag: boolean = false;
  editCategoryFlag: boolean = false;
  addSubCategoryFlag: boolean = false;
  loading: boolean = false;

  constructor(private _analyseSvc: AnalyseViewService,
    private _appStoreSvc: AppStoreService) { 
        this._analyseSvc.dFetchImageList();
  }
 
  ngOnInit() {
    this.subscriptions();
  }

  selectImage(pData) {
    this.selectedImage = pData;
  }

  subscriptions() {
    this._analyseSvc.sGetImageList().takeUntil(this.ngUnsubscriber).subscribe( list => this.imageList = list);  
  }

  analyseImage(pUrl) {
      this._analyseSvc.dAnalyzeImage(pUrl);
  }

  
  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }
}

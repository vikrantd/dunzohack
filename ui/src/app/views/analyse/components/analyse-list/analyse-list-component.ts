
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

import { AppStoreService } from '../../../../core-modules/app-store/state/app-store.service';
import { AnalyseViewService } from '../../state/analyse.service';
import { buildSavedToBeData } from '../../state/analyse.helper';

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
  analysedHeader: any;
  productArray: any;
  showAnalysedBox: boolean = false;

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
    this._analyseSvc.sGetAnalysedHeader().takeUntil(this.ngUnsubscriber).subscribe( data => this.analysedHeader = data);  
    this._analyseSvc.sGetProductArray().takeUntil(this.ngUnsubscriber).subscribe( list => this.productArray = list);  
    this._analyseSvc.sGetNewStoreId().takeUntil(this.ngUnsubscriber).subscribe( id => {
      if(id > 0) {
        this.productArray.forEach(product => {
          this._analyseSvc.dAddProductToInventory({id: id, productDetails: product})
        })
        this._analyseSvc.dSavedStore(0);
        this.showAnalysedBox = false;
      }
    })
  }

  saveData() {
    this._analyseSvc.dSaveToInventory(buildSavedToBeData(this.analysedHeader, this.productArray));
  }

  cancel() {
    this.showAnalysedBox = false;
  }

  analyseImage(pUrl) {
      this._analyseSvc.dAnalyzeImage(pUrl);
      this.showAnalysedBox = true;
  }

  
  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }
}

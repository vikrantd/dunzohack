
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

import { CategoryViewService } from '../../state/category-view.service';
import { AppStoreService } from '../../../../core-modules/app-store/state/app-store.service';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})

export class CategoriesListComponent implements OnInit {
  ngUnsubscriber: Subject<any> = new Subject<any> ();
  categoriesList: any[];
  selectedCategory: any;
  subscription: any;
  addCategoryFlag: boolean = false;
  editCategoryFlag: boolean = false;
  addSubCategoryFlag: boolean = false;
  loading: boolean = false;

  constructor(private _categoriesSvc: CategoryViewService,
    private _router: Router,
    private _appStoreSvc: AppStoreService) { 
    this._categoriesSvc.dFetchCategoriesList();
    this.subscription = this._router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
          let urlArray = event.urlAfterRedirects.split('/');
          if(urlArray[2] && urlArray[2] !== 'add') {
            this.handleReloadData(urlArray);
          } else {
            if(urlArray[2] && urlArray[2] == 'add') this._categoriesSvc.dSetAddState(true);
          }
        }
      });
  }
 
  ngOnInit() {
    this.subscriptions();
  }

  subscriptions() {
    this._categoriesSvc.sGetCategoriesList().takeUntil(this.ngUnsubscriber).subscribe( list => this.categoriesList = list);
    this._categoriesSvc.sGetAddState().takeUntil(this.ngUnsubscriber).subscribe( flag => this.addCategoryFlag = flag);
    this._categoriesSvc.sGetEditState().takeUntil(this.ngUnsubscriber).subscribe( flag => this.editCategoryFlag = flag);
    this._categoriesSvc.sGetAddSubCategoryState().takeUntil(this.ngUnsubscriber).subscribe( flag => this.addSubCategoryFlag = flag);
    this._categoriesSvc.sGetSelectedCategory().takeUntil(this.ngUnsubscriber).subscribe( category => this.selectedCategory = category);
    this._categoriesSvc.sGetRouterUrl().takeUntil(this.ngUnsubscriber).subscribe( url => {if(url !== '')this._router.navigate([url])});
    this._appStoreSvc.sGetViewLoading().takeUntil(this.ngUnsubscriber).subscribe( flag => this.loading = flag);
  }

  selectCategory(pCategory) {
      this._categoriesSvc.dSetSelectedCategory(pCategory);
      this._categoriesSvc.dSetRouterUrl('stores/' + pCategory.storeId);
      this._categoriesSvc.dFetchSubCategoryList();
      this.resetStates();
  }

  addCategory() {
    this._categoriesSvc.dSetAddState(true);
    this._categoriesSvc.dSetRouterUrl('category/add');
  }

  hideDetailView(pFlag) {
    this.resetStates();
  }

  resetStates() {
    this._categoriesSvc.dSetEditState(false);
    this._categoriesSvc.dSetAddState(false);
    this._categoriesSvc.dSetAddSubCategoryState(false);
  }

  handleReloadData(pUrlArray) {
    this._categoriesSvc.dSetReloadData(pUrlArray);
    this._categoriesSvc.dSetSelectedCategoryId(pUrlArray[2]);
    this._categoriesSvc.dFetchSubCategoryList();
  }

  
  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
    this.subscription.unsubscribe();
  }
}

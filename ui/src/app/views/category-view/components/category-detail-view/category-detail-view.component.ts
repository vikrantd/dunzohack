
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { CategoryViewService } from '../../state/category-view.service';
import { AppStoreService } from '../../../../core-modules/app-store/state/app-store.service';

@Component({
  selector: 'category-detail-view',
  templateUrl: './category-detail-view.component.html',
  styleUrls: ['./category-detail-view.component.scss']
})

@HostListener("window:scroll", ["$event"])

export class CategoryDetailViewComponent implements OnInit {
  ngUnsubscriber: Subject<any> = new Subject<any> ();
  subCategoriesList: any[] = [];
  selectedCategory: any;
  subCategoryToBeDeleted: any = {};
  subCategoryFlag: boolean;
  fetchNextFlag: boolean;
  loading: boolean;
  selectedDepartment: any;
  public subscription: Subscription;

  @Output() hideDetailView = new EventEmitter();

  constructor(private _categoriesSvc: CategoryViewService,
    private _appStoreSvc: AppStoreService) { 
  }
 
  ngOnInit() {
    this._categoriesSvc.sGetSubCategoriesList().takeUntil(this.ngUnsubscriber).subscribe( list => this.subCategoriesList = list);
    this._categoriesSvc.sGetSelectedCategory().takeUntil(this.ngUnsubscriber).subscribe( category => this.selectedCategory = category);
    this._categoriesSvc.sGetFetchNextFlag().takeUntil(this.ngUnsubscriber).subscribe( flag => this.fetchNextFlag = flag);
    this._appStoreSvc.sGetViewLoading().takeUntil(this.ngUnsubscriber).subscribe( flag => this.loading = flag);
  }

  hideView() {
    this._categoriesSvc.dSetRouterUrl('category/');
    this._categoriesSvc.dSetSelectedCategory({});
    this._categoriesSvc.dSetEditState(false);
    this._categoriesSvc.dSetAddState(false);
    this._categoriesSvc.dSetAddSubCategoryState(false);
  }

  editCategory() {
      this._categoriesSvc.dSetEditState(true);
      this._categoriesSvc.dSetRouterUrl('category/'+ this.selectedCategory.id +'/edit');
  }

  addSubCategory() {
     this._categoriesSvc.dSetRouterUrl('category/'+ this.selectedCategory.id +'/subcategory/add');
     this._categoriesSvc.dSetAddSubCategoryState(true);
  }

  deleteSubCategory(pSubCategory, pFlag) {
    this.subCategoryToBeDeleted = pSubCategory;
    this.subCategoryFlag = pFlag;
  }

  deleteCategory() {
    this.subCategoryFlag ? this._categoriesSvc.dDeleteSubCategory(this.subCategoryToBeDeleted) : this._categoriesSvc.dDeleteCategory();
  }

  onScroll(pEvent) {
    if (pEvent.target.offsetHeight + pEvent.target.scrollTop >= (pEvent.target.scrollHeight - 1) && this.fetchNextFlag) {
        this.fetchNextFlag = false;
        this._categoriesSvc.dFetchNextDataList();
    }
  }

  selectCategory(pData) {
    this.selectedDepartment = pData;
  }
  
  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }
}

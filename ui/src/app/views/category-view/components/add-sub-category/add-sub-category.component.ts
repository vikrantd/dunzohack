
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

import { SubCategory } from '../../models/SubCategory';
import { CategoryViewService } from '../../state/category-view.service';
import { parseRequestObject } from '../../state/category-view.helpers';

@Component({
  selector: 'add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})

export class AddSubCategoryComponent implements OnInit {
  ngUnsubscriber: Subject<any> = new Subject<any> ();
  newSubCategory: SubCategory = new SubCategory();
  editState: boolean = false;
  
  @Output() hideDetailView = new EventEmitter(); 

  constructor(private _categoriesSvc: CategoryViewService) {  
  }
 
  ngOnInit() {
    this._categoriesSvc.sGetSelectedCategory().takeUntil(this.ngUnsubscriber).subscribe( category => {
       this.newSubCategory.parentType = category.name;
       this.newSubCategory.categoryId = category.id;
  });
  }

  saveCategory() {
    this._categoriesSvc.dSaveSubCategory(parseRequestObject(this.newSubCategory));
  }

  cancel() {
    this._categoriesSvc.dTraverseBack();
  }

  breadcrumbNav(pFlag) {
      pFlag ? this.resetState() : this._categoriesSvc.dTraverseBack(); 
  }

  resetState() {
    this._categoriesSvc.dSetRouterUrl('category/');
    this._categoriesSvc.dSetSelectedCategory({});
    this._categoriesSvc.dSetEditState(false);
    this._categoriesSvc.dSetAddState(false);
    this._categoriesSvc.dSetAddSubCategoryState(false);
  }

  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }
}

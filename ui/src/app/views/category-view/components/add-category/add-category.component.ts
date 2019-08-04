
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

import { Category } from '../../models/Category';
import { CategoryViewService } from '../../state/category-view.service';

@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})

export class AddCategoryComponent implements OnInit {
  ngUnsubscriber: Subject<any> = new Subject<any> ();
  newCategory: Category = new Category();
  editState: boolean = false;
  
  @Output() hideDetailView = new EventEmitter(); 

  constructor(private _categoriesSvc: CategoryViewService) {   
  }
 
  ngOnInit() {
      this._categoriesSvc.sGetEditState().takeUntil(this.ngUnsubscriber).subscribe(flag => {
          this.editState = flag;
          if(flag)  {
            this._categoriesSvc.sGetSelectedCategory().takeUntil(this.ngUnsubscriber).subscribe( category => {
                if(flag !== undefined && flag) this.newCategory = category;
            });
          } else {
              this.newCategory = new Category();
          }
      });
  }

  saveCategory() {
    this.editState ? this._categoriesSvc.dEditCategory(this.newCategory) : this._categoriesSvc.dSaveCategory(this.newCategory);
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

  get title() {
      return this.editState ? "Edit Category" : "Add Category";
  }
}

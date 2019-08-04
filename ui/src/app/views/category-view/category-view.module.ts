import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import 'rxjs';

import { CategoryViewService } from './state/category-view.service';
import { CategoryViewActions } from './state/category-view.actions';
import { categoryView } from './state/category-view.reducer';
import { CategoryViewEffects } from './state/category-view.effects';
import { CategoryDetailViewComponent } from './components/category-detail-view/category-detail-view.component';
import { CategoryRoutingModule } from './category-view.routing.module';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSubCategoryComponent } from './components/add-sub-category/add-sub-category.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('categoryView', categoryView),
        EffectsModule.forFeature([CategoryViewEffects]),
        CategoryRoutingModule
    ],
    declarations: [
        CategoryDetailViewComponent,
        CategoriesListComponent,
        AddCategoryComponent,
        AddSubCategoryComponent
    ],
    providers: [
        CategoryViewService,
        CategoryViewActions
    ],
    exports: []
})

export class CategoryViewModule {
}

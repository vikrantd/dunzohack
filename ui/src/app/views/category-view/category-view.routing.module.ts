import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import { AuthGuard } from '../../guards/auth.guard';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryDetailViewComponent } from './components/category-detail-view/category-detail-view.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddSubCategoryComponent } from './components/add-sub-category/add-sub-category.component';

const categoryRoutes: Routes = [
  {
    path: '',
    component: CategoriesListComponent,
    children : [
        { path: 'add', canActivate: [AuthGuard], component: AddCategoryComponent},
        { path: ':id', canActivate: [AuthGuard],
          children: [
            { path: '', canActivate: [AuthGuard], component: CategoryDetailViewComponent},
           { path: 'edit', canActivate: [AuthGuard], component: AddCategoryComponent},
           { path: 'subcategory/add', canActivate: [AuthGuard], component: AddSubCategoryComponent}
          ]
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule]
})

export class CategoryRoutingModule { }

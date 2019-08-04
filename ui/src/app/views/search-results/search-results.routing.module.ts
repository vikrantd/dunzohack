import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import { AuthGuard } from '../../guards/auth.guard';
import { SearchResultsComponent } from './components/search-results.component';

const searchRoutes: Routes = [
  {
    path: '',
    component: SearchResultsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule]
})

export class SearchResultsRoutingModule { }

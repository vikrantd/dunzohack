import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import { AuthGuard } from '../../guards/auth.guard';
import { HomeViewComponent } from './components/home-view.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeViewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }

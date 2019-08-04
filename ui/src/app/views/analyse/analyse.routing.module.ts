import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import { AuthGuard } from '../../guards/auth.guard';
import { AnalyseListComponent } from './components/analyse-list/analyse-list-component';

const analyseRoutes: Routes = [
  {
    path: '',
    component: AnalyseListComponent,
    children : [
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(analyseRoutes)],
  exports: [RouterModule]
})

export class AnalyseRoutingModule { }

import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';

import { LoginComponent } from './components/login.component';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }

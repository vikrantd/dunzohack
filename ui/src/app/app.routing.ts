import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';



const appRoutes: Routes = [
  {path: 'home', canActivate: [AuthGuard], loadChildren: './views/home/home.module#HomeModule'},
  {path: 'stores', canActivate: [AuthGuard], loadChildren: './views/category-view/category-view.module#CategoryViewModule'},
  {path: 'analyse', canActivate: [AuthGuard], loadChildren: './views/analyse/analyse.module#AnalyseViewModule'},
  {path: 'searchResults', canActivate: [AuthGuard], loadChildren: './views/search-results/search-results.module#SearchModule'},
  {path: '**', redirectTo: 'home'}
];

export const routing = RouterModule.forRoot(appRoutes);

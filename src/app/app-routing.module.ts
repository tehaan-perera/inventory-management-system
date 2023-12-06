import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AddStockComponent } from './components/add-stock/add-stock.component';
import { UpdateStockComponent } from './components/update-stock/update-stock.component';
import { ViewStockComponent } from './components/view-stock/view-stock.component';
import { UserComponent } from './components/user/user.component';

import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'add-stock',
    component: AddStockComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-stock/:id',
    pathMatch: 'prefix',
    component: UpdateStockComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-stock',
    pathMatch: 'prefix',
    component: ViewStockComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'user-profile',
    pathMatch: 'prefix',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

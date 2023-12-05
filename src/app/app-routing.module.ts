import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AddStockComponent } from './components/add-stock/add-stock.component';
import { UpdateStockComponent } from './components/update-stock/update-stock.component';
import { ViewStockComponent } from './components/view-stock/view-stock.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from '@auth0/auth0-angular';

const authService = new AuthService();

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    // canActivate: [() => authService.isAuthenticated()],
  },
  {
    path: 'add-stock',
    component: AddStockComponent,
    // canActivate: [() => authService.isAuthenticated()],
    canActivate: [AuthGuard],
  },
  {
    path: 'update-stock/:id',
    pathMatch: 'prefix',
    component: UpdateStockComponent,
    // canActivate: [() => authService.isAuthenticated()],
    canActivate: [AuthGuard],
  },
  {
    path: 'view-stock',
    pathMatch: 'prefix',
    component: ViewStockComponent,
    // canActivate: [() => authService.isAuthenticated()],
    canActivate: [AuthGuard],
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

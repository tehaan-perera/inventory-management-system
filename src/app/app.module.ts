import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';

import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { UpdateStockComponent } from './components/update-stock/update-stock.component';
import { ViewStockComponent } from './components/view-stock/view-stock.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    AddStockComponent,
    UpdateStockComponent,
    ViewStockComponent,
    UserComponent,
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-gf8k8p0pzeflyyth.eu.auth0.com',
      clientId: 'fCt2gkcd0Do7ll9Q36BUOv9jG4ML7lVB',
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: 'http://localhost:8100/home',
      },
    }),
  ],

  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    AuthGuard,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

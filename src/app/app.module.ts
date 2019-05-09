import { FormsModule } from '@angular/forms';
import { Util } from './util/util';
import { BuyProductPageModule } from "./pages/buy-product/buy-product.module";
import { BuyProductPage } from "./pages/buy-product/buy-product.page";
import { ProductServiceService } from "./providers/product-service.service";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material";
import { LoginPageModule } from "./pages/login/login.module";
import { IonicStorageModule } from '@ionic/storage';
import { StoragePurchasedService } from './providers/storage-purchased.service';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BuyProductPageModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LoginPageModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    ProductServiceService,
    Util
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

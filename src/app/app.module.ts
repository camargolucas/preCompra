import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { ApiConfig } from './util/api-config';
import { NativeKeyboard } from '@ionic-native/native-keyboard/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Util } from './util/util';
import { BuyProductPageModule } from "./pages/buy-product/buy-product.module";
import { BuyProductPage } from "./pages/buy-product/buy-product.page";

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
import { MatButtonModule, MatAutocompleteModule, MatFormFieldModule, MatOptionModule, MatInputModule, MatSelectModule } from "@angular/material";
import { LoginPageModule } from "./pages/login/login.module";
import { IonicStorageModule } from '@ionic/storage';
import { StoragePurchasedService } from './providers/storage/storage-purchased.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { ProductServiceService } from './providers/service/product/product-service.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxCurrencyModule } from "ngx-currency";
import { BrMaskerModule } from 'brmasker-ionic-3';
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
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    LoginPageModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    ScrollingModule,
    BrMaskerModule,
    NgxCurrencyModule



  ],
  providers: [
    StatusBar,
    SplashScreen,
    [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    ProductServiceService,
    Util,
    DatePipe,
    Keyboard,
    NativeKeyboard,
    ApiConfig,
    AppMinimize
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

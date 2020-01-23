import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgxCurrencyModule } from "ngx-currency";
import { BuyProductPage } from './buy-product.page';
import { MatAutocompleteModule, MatFormFieldModule, MatOptionModule, MatInputModule, MatSelectModule } from '@angular/material';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export let options: Partial<IConfig> | (() => Partial<IConfig>) 
const routes: Routes = [
  {
    path: '',
    component: BuyProductPage
  }
];

@NgModule({
  imports: [
    NgxMaskModule.forRoot(options),
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    AutoCompleteModule,
    ScrollingModule,
    BrMaskerModule,
    NgxCurrencyModule

  ],
  declarations: [BuyProductPage]
})
export class BuyProductPageModule { }

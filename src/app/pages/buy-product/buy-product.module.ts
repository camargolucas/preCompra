import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuyProductPage } from './buy-product.page';
import { MatAutocompleteModule, MatFormFieldModule, MatOptionModule, MatInputModule, MatSelectModule } from '@angular/material';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CurrencyMaskModule } from 'ng2-currency-mask';

const routes: Routes = [
  {
    path: '',
    component: BuyProductPage
  }
];

@NgModule({
  imports: [
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
    CurrencyMaskModule
  ],
  declarations: [BuyProductPage]
})
export class BuyProductPageModule { }

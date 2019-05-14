import { MatFormFieldModule, MatOptionModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { Tab2Page } from "./tab2.page";
import { SearchPipe } from "./search.pipe";
import { MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: "",
    component: Tab2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ],
  declarations: [Tab2Page, SearchPipe]
})
export class Tab2PageModule { }

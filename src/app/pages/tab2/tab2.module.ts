import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { Tab2Page } from "./tab2.page";
import { SearchPipe } from "./search.pipe";

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
    RouterModule.forChild(routes)
  ],
  declarations: [Tab2Page, SearchPipe]
})
export class Tab2PageModule {}

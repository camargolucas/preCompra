import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadChildren: "./pages/login/login.module#LoginPageModule" },
  //"./pages/tabs/tabs.module#TabsPageModule"
  {
    path: "app",
    loadChildren: "./pages/tabs/tabs.module#TabsPageModule"
  },
  {
    path: "details",
    loadChildren: "./pages/details/details.module#DetailsPageModule"
  },
  {
    path: "buy-product",
    loadChildren: "./pages/buy-product/buy-product.module#BuyProductPageModule"
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

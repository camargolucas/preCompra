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
  { path: 'product-details', loadChildren: './pages/product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'edit-product-details', loadChildren: './pages/edit-product-details/edit-product-details.module#EditProductDetailsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

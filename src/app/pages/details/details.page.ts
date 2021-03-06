import { ProdutoComprado } from './../../model/produtoComprado';
import { BuyProductPage } from "./../buy-product/buy-product.page";

import { Produto } from "./../../model/produto";
import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { ProductServiceService } from 'src/app/providers/service/product/product-service.service';

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: ProductServiceService,
    public modalController: ModalController
  ) { }
  idLoja: number;
  produtos: Produto[];
  produto;
  async openModal(produto: Produto) {
    const modal = await this.modalController.create({
      component: BuyProductPage,
      cssClass: "my-custom-modal-css",
      componentProps: {
        produto: produto
      }
    });
    return await modal.present();


  }

  ngOnInit() {

    this.route.queryParams.subscribe(param => {

      this.produto = this.buildJsonProduct(param)

      this.service.getByProduct(this.produto)
        .subscribe(result => {

          this.produtos = result
        })
    });
  }

  buildJsonProduct(obj) {
    let objProduto;
    let produto = JSON.parse(obj['produto'])
    let grupo = JSON.parse(obj['grupo'])

    return objProduto = {
      'produto': produto,
      'grupo': grupo
    }
  }

  goToProductDetail(produto: Produto) {
    let product = JSON.stringify(produto)

    let navExtras: NavigationExtras = {
      queryParams: {
        'produto': product,
      }
    }
    this.router.navigate(["/product-details"], navExtras);
  }
}



import { ModalController } from '@ionic/angular';
import { ProdutoComprado } from './../../model/produtoComprado';
import { Usuario } from 'src/app/model/usuario';

import { Router, NavigationExtras } from '@angular/router';
import { Produto } from "./../../model/produto";

import { GrupoEconomico } from "../../model/grupoEconomico";
import { Component, OnInit, ViewChild } from "@angular/core";
import { BuyProductPage } from '../buy-product/buy-product.page';
import { ProductServiceService } from 'src/app/providers/service/product/product-service.service';
import { StorageService } from 'src/app/providers/storage/storage.service';
@Component({
  selector: "app-tab2",
  templateUrl: "./tab2.page.html",
  styleUrls: ["./tab2.page.scss"]
})
export class Tab2Page implements OnInit {

  produtos: Produto[];
  terms: string = "";
  usuario: Usuario

  @ViewChild("searchbar") searchbar;

  constructor(public service: ProductServiceService, private router: Router, private modalController: ModalController, private storage: StorageService) {

  }

  ngOnInit() {

    this.getUser();
  }

  getUser() {
    this.storage.get('Usuario')
      .then(user => {
        this.usuario = user;
        this.getProducts('F');
      });
  }

  getProducts(type: any) {
    return this.storage.get('ProdutoPedido').then((result => {

      this.filterByType(type, result);
    }));

  }

  filterByType(type: string, arrProdutos) {
    return this.produtos = arrProdutos.filter(ret => {
      return ret['tipo'] === type;
    });
  }

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

  goToProductDetail(produto: Produto) {
    let product = JSON.stringify(produto);

    let navExtras: NavigationExtras = {
      queryParams: {
        'produto': product,
      }
    };
    this.router.navigate(["/product-details"], navExtras);
  }

  goToProduct(produto: Produto) {
    let product = JSON.stringify(produto);

    let grupo = this.usuario['grupoEconomico']
    let navExtras: NavigationExtras = {
      queryParams: {
        'produto': product,
        'grupo': grupo
      }
    };
    this.router.navigate(["/details"], navExtras);
  }

}

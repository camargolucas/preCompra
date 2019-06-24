import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { ProdutoComprado } from './../../model/produtoComprado';
import { Usuario } from 'src/app/model/usuario';

import { Router, NavigationExtras } from '@angular/router';
import { Produto } from "./../../model/produto";

import { GrupoEconomico } from "../../model/grupoEconomico";
import { Component, OnInit, ViewChild } from "@angular/core";
import { BuyProductPage } from '../buy-product/buy-product.page';
import { ProductServiceService } from 'src/app/providers/service/product/product-service.service';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { StoragePurchasedService } from 'src/app/providers/storage/storage-purchased.service';
@Component({
  selector: "app-tab2",
  templateUrl: "./tab2.page.html",
  styleUrls: ["./tab2.page.scss"]
})
export class Tab2Page implements OnInit {

  produtos: Produto[];
  terms: string = "";
  usuario: Usuario
  loading: any;
  segmentValue = "F";

  @ViewChild("searchbar") searchbar;

  constructor(public service: ProductServiceService, private router: Router, private modalController: ModalController,
    private storage: StorageService, private storagePurchased: StoragePurchasedService,
    private loadingController: LoadingController, private apiProduct: ProductServiceService,
    private alertController: AlertController) {

  }

  ngOnInit() {

    this.getUser();
  }
  ionViewCanEnter() {
    console.log(this.storagePurchased.ProdutosComprados.length);
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
    //this.produtos
    return this.apiProduct.ProdutoPedido = arrProdutos.filter(ret => {
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

  addProduct(produto: Produto) {
    let product = JSON.stringify(produto);

    let navExtras: NavigationExtras = {
      queryParams: {
        'produto': product,
      }
    };

    this.router.navigate(["/buy-product"], navExtras);

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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Atualizando os pedidos, aguarde ...'
    });
    await this.loading.present();
  }

  async dismissLoading() {
    // this.enableButton();
    return await this.loading.dismiss();
  }

  async refresh() {
    await this.presentLoading();
    this.apiProduct.getDetailedByGroup(this.usuario['grupoEconomico']).subscribe((result) => {
      this.storage.update('ProdutoPedido', result).then((value => {
        this.filterByType(this.segmentValue, value);
        this.dismissLoading();
      }));
    });
  }


  async presentAlertConfirm() {


    const alert = await this.alertController.create({
      header: 'Finalizar',
      message: 'Message <strong>text</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.finish();
          }
        }
      ]
    });

    await alert.present();
  }

  finish() {

    this.buildJson(this.storagePurchased.ProdutosComprados);
    // this.apiProduct.insertCompra(this.storagePurchased.ProdutosComprados);

  }

  buildJson(arr: Array<ProdutoComprado>) {


  }


}

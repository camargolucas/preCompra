import { ModalController, ToastController } from '@ionic/angular';
import { Produto } from 'src/app/model/produto';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { StoragePurchasedService } from 'src/app/providers/storage/storage-purchased.service';
import { ProdutoComprado } from 'src/app/model/produtoComprado';
import { BuyProductPage } from '../buy-product/buy-product.page';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  produto: Produto;
  produtos: ProdutoComprado[] = [];
  qtdTotal: number;
  valorTotal: number;

  constructor(private route: ActivatedRoute, private storage: StoragePurchasedService,
    private modalController: ModalController, private toast: ToastController) {

  }

  ngOnInit() {
    this.getDataRoute();
    this.loadProductData();
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

  edit(produto: ProdutoComprado) {
    this.openModal(produto)
  }

  async remove(produto: ProdutoComprado) {

    let id = produto['idComprado'];
    await this.storage.delete(id)
      .then((result => {
        this.presentToast('Deletado com sucesso');
      })).catch((err => console.log(err)));

    await this.loadProductData();
  }

  getDataRoute() {
    return this.route.queryParams.subscribe(result => {
      this.produto = JSON.parse(result['produto']);

    });
  }

  sumTotal(produto) {

  }

  async loadProductData() {

    await this.storage.get()
      .then(result => {

        this.produtos = result.filter(product => {

          return (product['nome'] === this.produto['nome']);

        });
      });
  }


  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}

import { ModalController, ToastController, NavController } from '@ionic/angular';
import { Produto } from 'src/app/model/produto';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { StoragePurchasedService } from 'src/app/providers/storage/storage-purchased.service';
import { ProdutoComprado } from 'src/app/model/produtoComprado';
import { BuyProductPage } from '../buy-product/buy-product.page';
import { observe } from 'rxjs-observe';


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
    private modalController: ModalController, private toast: ToastController,
    private router: Router, public navCtrl: NavController) {

  }



  ngOnInit() {
    this.getDataRoute();
  }

  ionViewWillEnter() {
    this.loadProductData();
  }


  goToProductDetail(produto: Produto) {
    let product = JSON.stringify(produto);

    let navExtras: NavigationExtras = {
      queryParams: {
        'produto': product,
      }
    };
    this.router.navigate(["/buy-product"], navExtras);
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
    this.openModal(produto);
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

  async loadProductData() {

    await this.storage.get()
      .then(result => {
        this.storage.ProdutosComprados = result.filter(product => {
          return (product['idPedido'] === this.produto['idPedido']);
        });
      });
  }

  sumValor(): number {
    var initialValue = 0;
    var sum = this.storage.ProdutosComprados.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.valor;
    }, initialValue);
    return sum;
  }

  sumPeso(): number {

    var initialValue = 0;
    var sum = this.storage.ProdutosComprados.reduce(function (accumulator, currentValue) {
      if (currentValue.unidadeComprada === 'Caixa') return accumulator + (currentValue.peso * currentValue.qtd);
      else return accumulator + currentValue.qtd;
    }, initialValue);

    return sum;

  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}

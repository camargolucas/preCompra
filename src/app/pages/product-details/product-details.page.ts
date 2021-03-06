import { StorageService } from './../../providers/storage/storage.service';
import { ProdutoCompradoLista } from 'src/app/model/produtoCompradoLista';
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
  produtosLista: ProdutoCompradoLista[] = [];
  qtdTotal: number;
  valorTotal: number;

  constructor(private route: ActivatedRoute, private storage: StoragePurchasedService,
    private modalController: ModalController, private toast: ToastController,
    private router: Router, public navCtrl: NavController, private _storage: StorageService) {

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
        'qtdPedida': this.produto['qtd']
      }
    };
    this.router.navigate(["/buy-product"], navExtras);
  }

  async openModal(produto: Produto) {

    const modal = await this.modalController.create({
      component: BuyProductPage,
      cssClass: "my-custom-modal-css",

      componentProps: {
        produto: {
          'produtoComprado': produto,
          'qtdPedida': this.produto['qtd']
        },
      }
    });
    return await modal.present();
  }

  edit(produto: ProdutoComprado) {
    this.openModal(produto);
  }

  async remove(produto: ProdutoComprado) {

    let id = produto['idComprado'];
    await this.storage.delete(produto)
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

    let filtered = await this.storage.ProdutosCompradosLista.filter(((product, index, arr) => {
      return (product['idPedido'] === this.produto.idPedido);
    }));

    if (filtered.length) this.produtos = filtered[0]['ProdutoComprado'].filter(x => x.usuario.idUsuario === this._storage.usuario.idUsuario)
    else this.produtos = [];

  }

  sumValor(): number {
    var initialValue = 0;
    var sum = this.produtos.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.valor;
    }, initialValue);
    return sum;
  }

  sumPeso(): number {

    var initialValue = 0;
    var sum = this.produtos.reduce(function (accumulator, currentValue) {
      if (currentValue.unidadeComprada === 'Caixa')
        return accumulator + (currentValue.peso * currentValue.qtd);
      else
        return accumulator + currentValue.qtd;
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

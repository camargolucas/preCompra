import { Util } from 'src/app/util/util';
import { ModalController, LoadingController, AlertController, ToastController, IonRouterOutlet, Platform } from '@ionic/angular';
import { ProdutoComprado } from './../../model/produtoComprado';
import { Usuario } from 'src/app/model/usuario';

import { Router, NavigationExtras } from '@angular/router';
import { Produto } from "./../../model/produto";

import { GrupoEconomico } from "../../model/grupoEconomico";
import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { BuyProductPage } from '../buy-product/buy-product.page';
import { ProductServiceService } from 'src/app/providers/service/product/product-service.service';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { StoragePurchasedService } from 'src/app/providers/storage/storage-purchased.service';
import { zip, catchError } from 'rxjs/operators';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { ProdutoCompradoLista } from 'src/app/model/produtoCompradoLista';
import { fromEvent } from 'rxjs';
import { UserServiceService } from 'src/app/providers/service/user/user-service.service';
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
  finishButton: boolean;
  ProdutosLista: Array<ProdutoCompradoLista> = []

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  @ViewChild("searchbar") searchbar;

  constructor(public service: ProductServiceService, private router: Router, private modalController: ModalController,
    private storage: StorageService, private storagePurchased: StoragePurchasedService,
    private loadingController: LoadingController, private apiProduct: ProductServiceService,
    private alertController: AlertController,
    private toast: ToastController, private platform: Platform, private appMinimize: AppMinimize
    , private userService: UserServiceService, private util: Util) {


    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {

        this.routerOutlet.pop();
      } else if (this.router.url === '/app/tabs/tab2') {
        //this.platform.exitApp();
        // or if that doesn't work, try
        this.appMinimize.minimize();
      } else {
        this.presentAlertFinish();
      }
    });

  }




  ngOnInit() {
    this.verifyAvaibleFinish()
    console.log(this.getFinishButton())
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

    let grupo = this.usuario['grupoEconomico'];
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


  async presentAlertFinish() {

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
    // Preparando os dados para enviar a API
    let arrProdutos: Array<ProdutoCompradoLista> = []
    arrProdutos = this.arrayDataByUser()

    if (arrProdutos.length) {

      this.apiProduct.insertCompra(arrProdutos).subscribe(response => {
        // resgato o resultado da API para verificar se foi inserido com sucesso
        if (String(response) === this.util.getCodesApis()['error']) {
          this.showToast('Houve um problema ao tentar enviar a Compra')

        } else {
          this.setFinishButton(false);
          this.showToast('Compra finalizada !');
        }

      }, catchError => {
        this.showToast(catchError)
      })

    } else {
      this.showToast('É necessario comprar produto antes de finalizar');
    }
  }

  setFinishButton(status): void {
    this.finishButton = status;
  }

  getFinishButton(): boolean {
    return this.finishButton
  }


  async verifyAvaibleFinish() {

    let usuario: Usuario
    usuario = this.storage.usuario

    await this.userService.getIsAvaibleToBuy(usuario)
      .subscribe(result => {

        if (result[0]['Envios'] <= 0) {
          this.setFinishButton(true)
        } else {
          this.setFinishButton(false)
        }
      }, (error => {
        console.log(error)
        this.setFinishButton(false);
      }))

  }


  arrayDataByUser(): Array<ProdutoCompradoLista> {
    let arrProdutos: Array<ProdutoCompradoLista> = []
    this.storagePurchased.ProdutosCompradosLista.forEach((element, index) => {

      // Filtro os dados pelo usuario que está logado
      let obj = element.ProdutoComprado.filter(x => {
        return x.usuario.idUsuario === this.storage.usuario.idUsuario;
      })

      if (obj.length) {
        arrProdutos[index] = {
          'idPedido': element.idPedido,
          'ProdutoComprado': obj
        }
      }
    });

    return arrProdutos
  }


  hasDataInArray(): boolean {
    let retorno: boolean = false
    if (this.arrayDataByUser().length) retorno = true
    return retorno
  }

  verifyIfAlreadyBought(produto: Produto): boolean {
    let ret = []
    this.storagePurchased.ProdutosCompradosLista.forEach(value => {

      let x = value.ProdutoComprado.filter((result, i) => {
        return value['idPedido'] === produto['idPedido'] &&
          result['usuario']['idUsuario'] === this.storage.usuario.idUsuario
      })
      if (x.length) ret.push(x)
    });
    /* let ret = this.storagePurchased.ProdutosCompradosLista.filter((value, index) => {
      return value['idPedido'] === produto['idPedido'] &&
        value['ProdutoComprado'][0]['usuario']['idUsuario'] === this.storage.usuario.idUsuario

    });
 */


    if (ret.length) return true
    else return false

  }

  async showToast(mensagem: string) {
    const toast = await this.toast.create({ message: mensagem, duration: 3000 });
    toast.present();
  }

}

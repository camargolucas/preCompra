import { LoadingController, IonButton } from '@ionic/angular';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { StoragePurchasedService } from '../../providers/storage/storage-purchased.service';
import { ProdutoComprado } from './../../model/produtoComprado';
import { Util } from './../../util/util';
import { Unidade } from './../../model/unidade';
import { NavController, NavParams, ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Produto } from 'src/app/model/produto';
import { ViewController } from '@ionic/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.page.html',
  styleUrls: ['./buy-product.page.scss']
})


export class BuyProductPage implements OnInit {

  @ViewChild(MatAutocompleteTrigger) private trigger: MatAutocompleteTrigger;

  produto: Produto;
  produtoComprado: ProdutoComprado = new ProdutoComprado();
  quantidade: number;
  valor: number;
  fornecedor;
  unidades: Unidade[];
  unidade: Unidade;
  disabled = false;
  formProduct: FormGroup;
  validationMessages: any;
  fornecedorFormControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  edit: boolean;
  PRODUCT_NAME: string;
  loading: any;
  disable;

  constructor(private nav: NavController, public route: ActivatedRoute, public modal: ModalController, public util: Util,
    public storagePurchased: StoragePurchasedService, private storage: StorageService, private toast: ToastController
    , private loadingController: LoadingController, private navCtrl: NavController) {

    this.storage.get('ClienteFornecedor').then((result => {
      this.options = result;
    }));
  }

  pop() {
    this.navCtrl.navigateBack('/');
  }


  ngOnInit() {
    let produtoJson: any;
    this.route.queryParams.subscribe(result => {
      produtoJson = JSON.parse(result['produto']);
      this.PRODUCT_NAME = produtoJson['nome'];


      if (produtoJson['idComprado']) {
        this.produtoComprado = produtoJson;
        this.edit = true;
        if (this.produtoComprado.unidadeComprada) this.setDisabled(this.produtoComprado.unidadeComprada);

      } else {

        this.produtoComprado.id = produtoJson['id'];
        this.produtoComprado.nome = produtoJson['nome'];
        this.produtoComprado.unidade = produtoJson['unidade'];
        this.edit = false;
      }
    });

    this.unidades = this.util.getUnidades();
    this.validationMessages = this.util.getMessages();

    this.filteredOptions = this.fornecedorFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.formValidation();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Armazenando dados aguarde ...'
    });
    await this.loading.present();
  }

  dismissLoading() {
    this.enableButton();
    this.loading.dismiss();
  }

  disableButton() {
    return this.disable = true;
  }
  enableButton() {
    return this.disable = false;
  }

  formValidation() {

    this.formProduct = new FormGroup({
      /*   fornecedor: new FormControl('', Validators.required), */
      unidade: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      peso: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      valor: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((result => {
      return result['FANTASIA'].toLowerCase().startsWith(filterValue.toLowerCase());
    }));
  }

  cancel() {

    this.nav.pop();

  }

  verifyFields(): boolean {

    if (this.produtoComprado['fornecedor'] !== undefined) { return true; }

  }

  insert() {
    this.storagePurchased.insert(this.produtoComprado)
      .then((result) => {
        console.log(this.produtoComprado)
        this.presentToast('Produto Inserido com sucesso');
        this.dismissLoading();
        this.nav.pop();
      })
      .catch((err) => {
        this.dismissLoading();
        this.presentToast('Houve um problema, tente novamente mais tarde');
      });
  }

  async save() {
    if (this.verifyFields()) {
      await this.disableButton();
      await this.presentLoading();

      if (this.edit) {
        this.update();
      } else {
        this.insert();
      }
    } else {
      this.presentToast('Preencha todos os campos');
    }
  }

  update() {
    this.storagePurchased.update(this.produtoComprado)
      .then((x => {
        this.presentToast('Produto Atualizado com sucesso');
        this.dismissLoading();
        this.nav.pop();
      }))
      .catch((err => {
        this.dismissLoading();
        this.presentToast('Houve um problema, tente novamente mais tarde');
      }));
  }

  setDisabled(unidade): boolean {
    this.produtoComprado.unidadeComprada = unidade;

    if (unidade === 'Kilo') {
      // Kilo por padrão deve ter peso 1
      this.produtoComprado.peso = 1;
      return this.disabled = true;
    } else {
      return this.disabled = false;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


}

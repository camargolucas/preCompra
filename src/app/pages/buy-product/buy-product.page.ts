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
  edit: boolean

  constructor(public nav: NavParams, public modal: ModalController, public util: Util,
    public storagePurchased: StoragePurchasedService, private storage: StorageService, private toast: ToastController) {

    this.storage.get('ClienteFornecedor').then((result => {
      this.options = result;
    }));
  }

  ngOnInit() {


    if (this.nav.data['produto']['idComprado']) {
      this.produtoComprado = this.nav.data['produto']
      this.edit = true;
    } else {
      this.produto = this.nav.data['produto'];
      this.produtoComprado['id'] = this.produto['id'];
      this.produtoComprado['nome'] = this.produto['nome'];
      this.edit = false;
    }

    this.unidades = this.util.getUnidades();
    this.validationMessages = this.util.getMessages();

    this.filteredOptions = this.fornecedorFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.formValidation();
  }

  formValidation() {

    this.formProduct = new FormGroup({
      /*   fornecedor: new FormControl('', Validators.required), */
      unidade: new FormControl('', Validators.required),
      quantidade: new FormControl('', Validators.required),
      peso: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((result => {
      return result['FANTASIA'].toLowerCase().startsWith(filterValue.toLowerCase());
    }));
  }

  cancel() {

    this.modal.dismiss();

  }

  verifyFields(): boolean {

    if (this.produtoComprado['fornecedor'] !== undefined) { return true; }

  }

  insert() {
    this.storagePurchased.insert(this.produtoComprado)
      .then((result) => {
        this.presentToast('Produto Inserido com sucesso')
        this.modal.dismiss();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  save() {
    if (this.verifyFields()) {
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
        this.modal.dismiss();
      }))
      .catch((err => {
        this.presentToast('Houve um problema, tente novamente mais tarde');
      }))
  }

  setDisabled(unidade): boolean {
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

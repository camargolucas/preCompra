import { StoragePurchasedService } from './../../providers/storage-purchased.service';
import { ProdutoComprado } from './../../model/produtoComprado';
import { StorageService } from './../../providers/storage.service';
import { Util } from './../../util/util';
import { Unidade } from './../../model/unidade';
import { NavController, NavParams, ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { Produto } from "src/app/model/produto";
import { ViewController } from "@ionic/core";


@Component({
  selector: "app-buy-product",
  templateUrl: "./buy-product.page.html",
  styleUrls: ["./buy-product.page.scss"]
})
export class BuyProductPage implements OnInit {
  produto: Produto;
  produtoComprado: ProdutoComprado = new ProdutoComprado()
  quantidade: number;
  valor: number;
  fornecedor;
  unidades: Unidade[];
  unidade: Unidade
  disabled: boolean = false;
  constructor(public nav: NavParams, public modal: ModalController, public util: Util,
    public storage: StoragePurchasedService) {
  }

  ngOnInit() {
    this.produto = this.nav.data["produto"];
    this.unidades = this.util.getUnidades();

  }

  cancel() {
    this.modal.dismiss();
  }

  save() {
    this.produtoComprado['id'] = this.produto['id']
    this.produtoComprado['nome'] = this.produto['nome']

    this.storage.insert(this.produtoComprado)
      .then((result) => {
        this.modal.dismiss();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  setDisabled(unidade): boolean {
    if (unidade == 'Kilo') {
      return this.disabled = true;
    } else {
      return this.disabled = false;
    }
  }


}

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
  quantidade: number;
  constructor(public nav: NavParams, public modal: ModalController) {}

  ngOnInit() {
    this.produto = this.nav.data["produto"];
  }

  cancel() {
    this.modal.dismiss();
  }
}

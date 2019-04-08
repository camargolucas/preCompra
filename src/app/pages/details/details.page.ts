import { BuyProductPage } from "./../buy-product/buy-product.page";
import { ProductServiceService } from "./../../providers/product-service.service";
import { Produto } from "./../../model/produto";
import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  constructor(
    public router: ActivatedRoute,
    public service: ProductServiceService,
    public modalController: ModalController
  ) {}
  idLoja: number;
  produtos: Produto[];

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

  ngOnInit() {
    this.router.params.subscribe(param => {
      /*  this.service.get(param["id"]).subscribe(result => {
        this.produtos = result;
      }); */
    });
  }
}

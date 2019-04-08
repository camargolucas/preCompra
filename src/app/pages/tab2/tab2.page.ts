import { Produto } from "./../../model/produto";
import { ProductServiceService } from "./../../providers/product-service.service";
import { GrupoEconomico } from "../../model/grupoEconomico";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-tab2",
  templateUrl: "./tab2.page.html",
  styleUrls: ["./tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  Produtos: Produto[];
  terms: string = "";

  @ViewChild("searchbar") searchbar;

  constructor(public service: ProductServiceService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    return this.service.getByShop("1").subscribe(result => {
      this.Produtos = result;
    });
  }

  filter(event: any) {
    const val = event.target.value;

    if (val && val.trim() != "") {
      this.Produtos.filter(result => {
        return result.nome.toLowerCase().startsWith(val);
      });
    }
  }
}

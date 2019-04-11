import { ProdutoComprado } from './../../model/produtoComprado';
import { Usuario } from 'src/app/model/usuario';
import { StorageService } from './../../providers/storage.service';
import { Router, NavigationExtras } from '@angular/router';
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
  t: ProdutoComprado
  terms: string = "";
  usuario: Usuario

  @ViewChild("searchbar") searchbar;

  constructor(public service: ProductServiceService, private router: Router, private storage: StorageService) { }

  ngOnInit() {

    this.getUser();
  }

  getUser() {
    this.storage.get('Usuario')
      .then(user => {
        this.usuario = user
        this.getData(this.usuario['grupoEconomico'])
      })
  }

  getData(grupoEconomico) {
    return this.service.getByGroup(grupoEconomico).subscribe(result => {
      this.Produtos = result;
    });
  }

  goToProduct(produto: Produto) {
    let product = JSON.stringify(produto)

    let grupo = this.usuario['grupoEconomico']
    let navExtras: NavigationExtras = {
      queryParams: {
        'produto': product,
        'grupo': grupo
      }
    }
    this.router.navigate(["/details"], navExtras);
  }

}

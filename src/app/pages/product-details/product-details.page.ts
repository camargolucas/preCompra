import { Produto } from 'src/app/model/produto';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { StoragePurchasedService } from 'src/app/providers/storage-purchased.service';
import { ProdutoComprado } from 'src/app/model/produtoComprado';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  produto: Produto;
  produtos: ProdutoComprado[] = [];

  constructor(private route: ActivatedRoute, private storage: StoragePurchasedService) { }

  ngOnInit() {
    this.getDataRoute();
    this.filterByNameAndUnd();
  }

  async getDataRoute() {

    return await this.route.queryParams.subscribe(result => {
      this.produto = JSON.parse(result['produto']);
    })
  }

  async filterByNameAndUnd() {

    return await this.storage.get()
      .then(result => {
        console.log(result);
        this.produtos = result.filter(product => {
          return (product['nome'] === this.produto['nome'] && product['unidade'] === this.produto['unidade'])
        })
      })
  }

}

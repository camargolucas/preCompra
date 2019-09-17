import { Usuario } from 'src/app/model/usuario';
import { ApiConfig } from './../../../util/api-config';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, map } from "rxjs/operators";
import { Produto } from 'src/app/model/produto';
import { Util } from 'src/app/util/util';
import { ProdutoComprado } from 'src/app/model/produtoComprado';
import { Observable } from 'rxjs';
import { StorageService } from '../../storage/storage.service';
import { ProdutoCompradoLista } from 'src/app/model/produtoCompradoLista';
@Injectable({
  providedIn: "root"
})


export class ProductServiceService extends ApiConfig {
  public ProdutoPedido: Array<Produto> = [];

  constructor(public http: HttpClient, private storage: StorageService) {
    super();
  }

  get(data) {
    let dataStr = JSON.stringify(data);
    return this.http
      .get<Produto[]>(this.API_URL + "products/getSentStockByShop/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }

  getByGroup(data) {

    let dataStr = JSON.stringify(data);
    return this.http
      .get<Produto[]>(this.API_URL + "products/getRequestByGroup/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }

  getDetailedByGroup(data) {

    let dataStr = JSON.stringify(data);
    return this.http
      .get<Produto[]>(this.API_URL + "products/getRequestDetailedByGroup/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }

  getByProduct(data) {

    let dataStr = JSON.stringify(data);
    return this.http
      .get<Produto[]>(this.API_URL + "products/getRequestByProduct/" + encodeURI(dataStr))
      .pipe(tap(console.log));

  }

  insertCompra(produto: Array<ProdutoCompradoLista>) {

    let URL = this.API_URL + `products/insertCompra/`;

    return this.http.post<any>(URL, produto, this.getHeaderConfig(this.storage.usuario.token))

  }
}

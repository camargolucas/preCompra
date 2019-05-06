import { GrupoEconomico } from "../model/grupoEconomico";
import { Produto } from "./../model/produto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class ProductServiceService {
  API_URL = "http://apprequestapi.kinghost.net:21093/products/";
  // API_URL = "http://localhost:21093/products/";
  constructor(public http: HttpClient) { }

  get(data) {
    const dataStr = JSON.stringify(data);
    return this.http
      .get<Produto[]>(this.API_URL + "getSentStockByShop/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }

  getByGroup(data) {
    const dataStr = JSON.stringify(data);
    return this.http
      .get<Produto[]>(this.API_URL + "getRequestByGroup/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }
  getDetailedByGroup(data) {

    const dataStr = JSON.stringify(data);
    return this.http
      .get<Produto[]>(this.API_URL + "getRequestDetailedByGroup/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }


  getByProduct(data) {
    console.log('4')
    const dataStr = JSON.stringify(data);
    return this.http
      .get<Produto[]>(this.API_URL + "getRequestByProduct/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }
}

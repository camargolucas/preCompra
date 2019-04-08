import { GrupoEconomico } from "../model/grupoEconomico";
import { Produto } from "./../model/produto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class ProductServiceService {
  API_URL = "http://localhost:21093/products/";
  constructor(public http: HttpClient) {}

  get(data) {
    const dataStr = JSON.stringify(data);
    return this.http
      .get<Produto[]>(this.API_URL + "getSentStockByShop/" + encodeURI(dataStr))
      .pipe(tap(console.log));
  }

  getByShop(data) {
    const dataStr = JSON.stringify(data);
    return this.http
      .get<Produto[]>(this.API_URL + "getByGroup/" + encodeURI(dataStr))
      .pipe(tap());
  }
}

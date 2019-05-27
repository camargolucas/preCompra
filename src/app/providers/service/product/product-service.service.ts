
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Produto } from 'src/app/model/produto';
import { Util } from 'src/app/util/util';
@Injectable({
  providedIn: "root"
})
export class ProductServiceService extends Util {

  constructor(public http: HttpClient) {
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
}

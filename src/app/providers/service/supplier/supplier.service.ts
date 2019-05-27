import { Util } from './../../../util/util';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends Util {


  constructor(private http: HttpClient) {
    super()
  }

  getAll() {

    return this.http.get(this.API_URL + 'supplier/search/all').pipe(
      tap(console.log)
    );
  }


}

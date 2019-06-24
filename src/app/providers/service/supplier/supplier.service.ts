import { Usuario } from 'src/app/model/usuario';
import { StorageService } from './../../storage/storage.service';
import { ApiConfig } from './../../../util/api-config';
import { Util } from './../../../util/util';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends ApiConfig {


  constructor(private http: HttpClient, storage: StorageService) {
    super();
  }

  getAll() {

    return this.http.get(this.API_URL + 'supplier/search/all').pipe(
      tap(console.log)
    );
  }


}

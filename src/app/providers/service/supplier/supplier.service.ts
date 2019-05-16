import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  //API_URL = 'http://localhost:21093/supplier'
  API_URL = "http://apprequestapi.kinghost.net:21093/supplier"
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.API_URL + '/search/all').pipe(
      tap(console.log)
    );
  }


}

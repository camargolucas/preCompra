import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { AutoCompleteService } from 'ionic4-auto-complete';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CompleteServiceService implements AutoCompleteService {
  labelAttribute = "name";
  constructor(private http: HttpClient, private storage: StorageService) { }

  getResults(keyword: string) {
    return this.storage.get('ProdutoPedido')

  }
}

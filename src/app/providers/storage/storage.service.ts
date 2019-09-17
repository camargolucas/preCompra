import { Usuario } from 'src/app/model/usuario';

import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Produto } from 'src/app/model/produto';
@Injectable({
  providedIn: "root"
})
export class StorageService {
  private ProdutoPedido: Array<Produto> = [];
  public usuario: Usuario;
  constructor(private storage: Storage) { }

  public save(key: string, data: any) {
    return this.storage.set(key, data);
  }

  // ###################################
  // ## Remoção de produtos do cache ###
  public remove(key: string) {
    return this.storage.remove(key);
  }

  // ####################################
  // Atualização dos dados ##############
  public update(key: string, data: any) {
    return this.save(key, data);
  }

  public insert(key: string, data: any) {
    let arrResult: Array<any> = []

    return this.get(key)
      .then(result => {
        if (result) {

          arrResult = result;
          arrResult.push(data);

          return this.update(key, arrResult);

        } else {
          arrResult.push(data)
          return this.update(key, arrResult)
        }
      })
      .catch((err) => {
        return err
      })
  }

  // ##########################################
  // ## Resgata um objeto no storage pela chave(key) #####
  public get(key: string) {

    return this.storage.get(key);
  }
}

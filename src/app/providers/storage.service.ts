import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(private storage: Storage) {}

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

  // ##########################################
  // ## Resgata um objeto pela chave(key) #####
  public get(key: string) {
    return this.storage.get(key);
  }
}

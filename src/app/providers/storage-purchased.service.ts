import { ProdutoComprado } from 'src/app/model/produtoComprado';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
	providedIn: 'root'
})
export class StoragePurchasedService {
	key: string = "ProdutoComprado"
	constructor(private storage: Storage) { }


	// ##########################################
	// ## Resgata um objeto pela chave(key) #####
	public get() {
		console.log('2')
		return this.storage.get(this.key);
	}

	public insert(data: ProdutoComprado) {
		let arrResult: Array<ProdutoComprado> = []

		return this.get()
			.then(result => {
				if (result) {
					arrResult = result
					arrResult.push(data)

					return this.update(arrResult)
				} else {
					arrResult.push(data)
					return this.update(arrResult)
				}
			})
			.catch((err) => {
				return err
			})
	}

	public update(data: ProdutoComprado[]) {
		return this.storage.set(this.key, data);
	}

}
import { DatePipe } from '@angular/common';
import { ProdutoComprado } from 'src/app/model/produtoComprado';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
	providedIn: 'root'
})
export class StoragePurchasedService {
	ProdutosComprados: Array<ProdutoComprado> = [];
	key: string = "ProdutoComprado"
	constructor(private storage: Storage, private datePipe: DatePipe) { }

	// ##########################################
	// ## Resgata um objeto pela chave(key) #####
	public get() {
		return this.storage.get(this.key);
	}

	public insert(data: ProdutoComprado) {
		let id = this.datePipe.transform(new Date(), "ddMMyyyyHHmmss");
		data['idComprado'] = id;


		//let arrResult: Array<ProdutoComprado> = [];

		return this.get()
			.then(result => {
				if (result) {

					this.ProdutosComprados = result;
					this.ProdutosComprados.push(data);

					return this.set(this.ProdutosComprados);
				} else {
					this.ProdutosComprados.push(data);

					return this.set(this.ProdutosComprados);
				}

			})
			.catch((err) => {
				return err;
			});
	}

	public set(data: ProdutoComprado[]) {
		return this.storage.set(this.key, data);
	}

	public async delete(id: any) {

		await this.get()
			.then(result => {

				let index = result.findIndex(x => x.idComprado === id);
				if (index !== undefined) result.splice(index, 1);

				this.set(result);

			})
			.catch(err => console.log(err));
	}

	public async update(produtoComprado: ProdutoComprado) {
		await this.get()
			.then(result => {


				let index = result.findIndex(x => x.idComprado === produtoComprado.idComprado);
				if (index !== undefined) result.splice(index, 1);

				this.ProdutosComprados = result;

				this.ProdutosComprados.push(produtoComprado);

				this.set(this.ProdutosComprados);


			});
	}

}
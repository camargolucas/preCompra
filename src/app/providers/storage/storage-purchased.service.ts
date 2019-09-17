import { ProdutoCompradoLista } from './../../model/produtoCompradoLista';
import { DatePipe } from '@angular/common';
import { ProdutoComprado } from 'src/app/model/produtoComprado';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
	providedIn: 'root'
})
export class StoragePurchasedService {
	ProdutosComprados: Array<ProdutoComprado> = [];
	ProdutosCompradosLista: Array<ProdutoCompradoLista> = [];
	key: string = "ProdutoComprado"
	constructor(private storage: Storage, private datePipe: DatePipe) { }

	// ##########################################
	// ## Resgata um objeto pela chave(key) #####
	public get() {
		return this.storage.get(this.key);
	}

	public insert(data: ProdutoCompradoLista) {
		let id = this.datePipe.transform(new Date(), "ddMMyyyyHHmmss");
		data['ProdutoComprado'][0]['idComprado'] = id;

		return this.get()
			.then(result => {

				if (result) {
					for (let index = 0; index < result.length; index++) {
						if (result[index]['idPedido'] === data['idPedido']) {
							this.ProdutosCompradosLista = result;
							this.ProdutosCompradosLista[index]['ProdutoComprado'].push(data['ProdutoComprado'][0])
							this.set(this.ProdutosCompradosLista);
							return;
						}
					}

					this.ProdutosCompradosLista = result;
					this.ProdutosCompradosLista.push(data);
					/* 	this.ProdutosComprados = result;
						this.ProdutosComprados.push(data); */
					return this.set(this.ProdutosCompradosLista);

				} else {

					this.ProdutosCompradosLista.push(data);

					return this.set(this.ProdutosCompradosLista);

				}

			})
			.catch((err) => {
				return err;
			});
	}

	public set(data: ProdutoCompradoLista[]) {
		return this.storage.set(this.key, data);
	}

	public async delete(produtoComprado: ProdutoComprado) {

		this.ProdutosCompradosLista.forEach((element, i) => {
			if (element['idPedido'] === produtoComprado['idPedido']) {
				element['ProdutoComprado'].findIndex((x, index) => {
					let _found: boolean = (x['idComprado'] === produtoComprado['idComprado']);
					if (_found) {


						if (element['ProdutoComprado'].length > 1)
							element['ProdutoComprado'].splice(index, 1)
						else
							this.ProdutosCompradosLista.splice(i, 1);

						this.set(this.ProdutosCompradosLista);

						return true;
					}
				});
			}
		});
	}

	public async update(produtoComprado: ProdutoComprado) {
		this.ProdutosCompradosLista.forEach(element => {
			if (element['idPedido'] === produtoComprado['idPedido']) {
				element['ProdutoComprado'].findIndex((x, index) => {
					let _found: boolean = (x['idComprado'] === produtoComprado['idComprado']);
					if (_found) {
						element['ProdutoComprado'].splice(index, 1);
						element['ProdutoComprado'].push(produtoComprado);
						this.set(this.ProdutosCompradosLista);
						return true;
					}
				})
			}
		});
	}
}

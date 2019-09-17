import { Produto } from 'src/app/model/produto';
import { DatePipe } from "@angular/common";
import { Usuario } from './usuario';
export class ProdutoComprado extends Produto {
    idComprado: any;
    fornecedor: string;
    valor: number;
    peso: number = 1;
    unidadeComprada: string;
    usuario: Usuario
    constructor() {
        super();
    }
}

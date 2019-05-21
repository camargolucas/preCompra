import { Produto } from 'src/app/model/produto';
import { DatePipe } from "@angular/common";
export class ProdutoComprado extends Produto {
    idComprado: any;
    fornecedor: string;
    valor: number;
    peso: number = 1;

    constructor() {
        super()
    }
}



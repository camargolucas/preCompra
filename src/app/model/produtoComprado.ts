import { Produto } from 'src/app/model/produto';
export class ProdutoComprado extends Produto {
    fornecedor: string;
    valor: number;
    peso: number

    constructor() {
        super()
    }
}



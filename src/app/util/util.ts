import { Unidade } from './../model/unidade';

export class Util {

    unidade: Unidade[] = [
        {
            tipo: 'Kilo',
            value: 'kg'
        },
        /* {
            tipo: 'Bandeja',
            value: 'bj'
        } ,
   */   {
            tipo: 'Caixa',
            value: 'cx'
        }/*,
        {
            tipo: 'Bin',
            value: 'bn'
        },
        {
            tipo: 'Unidade',
            value   : 'un'
        } */
    ];

    validation_messages = {
        'fornecedor': [
            { type: 'required', message: 'Necessário escolher um fornecedor' },
            { type: 'pattern', message: 'Possuí carácteres inválidos' }
        ],
        'unidade': [
            { type: 'required', message: 'Escolha a unidade' },
        ],
        'quantidade': [
            { type: 'required', message: 'Digite a quantidade' },
            { type: 'pattern', message: 'Apenas números' },
            { type: 'maxLength', message: 'Máximo de 9 carácteres' },
        ],
        'valor': [
            { type: 'required', message: 'Digite o Valor' },
            { type: 'maxLength', message: 'Máximo de 10 carácteres' },
        ],
        'peso': [
            { type: 'required', message: 'Digite o Peso do produto' },
            { type: 'maxLength', message: 'Máximo de 8 carácteres' },
        ]
    };

    getUnidades() {
        return this.unidade;
    }

    getMessages() {
        return this.validation_messages;
    }

}

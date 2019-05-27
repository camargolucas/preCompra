import { Unidade } from './../model/unidade';

export class Util {

    //API_URL: string = "http://apprequestapi.kinghost.net:21093/"
    API_URL: string = "http://localhost:21093/"

    unidade: Unidade[] = [
        {
            tipo: 'Kilo',
            value: 'kg'
        },
        /* {
            tipo: 'Bandeja',
            value: 'bj'
        } ,
   */      {
            tipo: 'Caixa',
            value: 'cx'
        }/*,
        {
            tipo: 'Bin',
            value: 'bn'
        },
        {
            tipo: 'Unidade',
            value: 'un'
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
        ],
        'valor': [
            { type: 'required', message: 'Digite o Valor' }
        ],
        'peso': [
            { type: 'required', message: 'Digite o Peso do produto' }
        ]
    };


    getUnidades() {
        return this.unidade;
    }

    getMessages() {
        return this.validation_messages;
    }


}
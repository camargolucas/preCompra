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
    ]

    getUnidades() {
        return this.unidade
    }

    
}
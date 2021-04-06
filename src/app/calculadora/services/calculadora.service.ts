import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  /*Define as constantes utilizadas
  para identificar as operações de cálculo*/

  static readonly soma: string = '+';
  static readonly subtracao: string = '-';
  static readonly multiplicacao: string = '*';
  static readonly divisao: string = '/';

  constructor() { }

  calcular(valor1: number, valor2: number, operacao: string): any {
    let resultado: number; //Armazena o resultado da operação.

    switch (operacao) {
      case CalculadoraService.soma:
        resultado = valor1 + valor2;
      break;
      case CalculadoraService.subtracao:
        resultado = valor1 - valor2;
      break;
      case CalculadoraService.multiplicacao:
        resultado = valor1 * valor2;
      break;
      case CalculadoraService.divisao:
        resultado = valor1 * valor2;
      break;
      default:
        resultado = 0;
    }
  }
}

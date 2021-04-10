import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../../services/calculadora.service'

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private operacao: string;
  private resultado: number;

  constructor(
    private calculadoraService: CalculadoraService
  ) { }

  ngOnInit(): void {
    this.limparValor();
  }

  limparValor(): void {
    this.numero1 = "0";
    this.numero2 = null;
    this.operacao = null;
    this.resultado = null;
  }

  adicionarNumero(numero: string): void {
    if (this.operacao === null) {
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    } else {
    this.numero2 = this.concatenarNumero(this.numero2, numero);
    }
  }

  concatenarNumero(numeroAtual: string, numeroConcatenado: string): string {
    // Caso contenha apenas '0' ou null, reinicia o valor
    if (numeroAtual === '0' || numeroAtual === null) {
      numeroAtual = '';
    }

    // Primeiro digito é '.', concatenado '0' antes do ponto
    if (numeroConcatenado === '.' && numeroAtual === '') {
      return '0.';
    }

    // Caso '.' digitado e já contenha um '.', apenas retorna
    if (numeroConcatenado === '.' && numeroAtual.indexOf('.') > -1) {
      return numeroAtual;
    }

    return numeroAtual + numeroConcatenado;
  }

  definirOperacao(operacao: string): void {
    // Apenas define a operação caso não exista uma
    if (this.operacao === null) {
      this.operacao = operacao;
      return;
    }

    // Caso a operação definida é número 2 selecionado, efetua o cálculo da operação
    if (this.numero2 !== null) {

      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao);
      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }
  }

  calcular(): void {
    if (this.numero2 === null) {
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao);
  }

  get display(): string {
    if (this.resultado !== null) {
      return this.resultado.toString();
    }
    if (this.numero2 !== null) {
      return this.numero2;
    }
    return this.numero1;
  }
}

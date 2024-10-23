import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao> {
  constructor (
    private readonly _data: Date, 
    public readonly quantidade: number, 
    public readonly valor: number
  ) {}

  get data () {
    const date = new Date(this._data.getTime());
    return date;
  }

  get volume (): number {
    return this.quantidade * this.valor;
  }

  public static criaDe (dataString: string, quantidadeString: string, valorString: string): Negociacao {
    const exp = /-/g;
    
    const date = new Date(dataString.replace(exp, ','));
    const quantidade = parseInt(quantidadeString);
    const valor = parseFloat(valorString);

    return new Negociacao(date, quantidade, valor);
  }

  public paraTexto(): string {
    return `
      Data: ${this.data}
      Quantidade: ${this.quantidade}
      Valor: ${this.valor}
    `
  }

  public ehIgual (negociacao: Negociacao): boolean {
    return this.data.getDate() === negociacao.data.getDate()
      && this.data.getMonth() === negociacao.data.getMonth()
      && this.data.getFullYear() === negociacao.data.getFullYear()
  }
}
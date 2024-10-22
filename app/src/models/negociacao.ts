export class Negociacao {
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
}
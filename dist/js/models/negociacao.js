export class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get data() {
        const date = new Date(this._data.getTime());
        return date;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
}

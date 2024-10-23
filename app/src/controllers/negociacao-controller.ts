import { Negociacoes } from "../models/negociacoes.js";
import { Negociacao } from "../models/negociacao.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { inspect } from "../decorators/inspect.js";
import { domInjector } from "../decorators/dom-injector.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
  @domInjector('#data')
  private inputData: HTMLInputElement;
  @domInjector('#quantidade')
  private inputQuantidade: HTMLInputElement;
  @domInjector('#valor')
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');
  private negociacoesService = new NegociacoesService();

  constructor () {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect()
  @logarTempoDeExecucao()
  public adiciona (): void {
    
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value, 
      this.inputValor.value
    )

    if (!this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update('São aceitas apenas negociações em dias úteis!')
      return;
    }

    this.negociacoes.adiciona(negociacao);  

    console.log(negociacao.paraTexto());
    console.log(this.negociacoes.paraTexto());

    imprimir(negociacao, this.negociacoes);

    this.atualizaView();  
    this.limparFormulario();
  }

  public importaDados (): void {
    this.negociacoesService.obterNegociacoesDoDia()
      .then(negociacoesDeHoje => {
        return negociacoesDeHoje.filter(negociacaoDeHoje => {
          return !this.negociacoes.lista().some(negociacao => negociacao.ehIgual(negociacaoDeHoje))
        })
      })
      .then(negociacoesDeHoje => {
        for (let negociacao of negociacoesDeHoje) {
          this.negociacoes.adiciona(negociacao);
        }
        this.negociacoesView.update(this.negociacoes);
      });
  }

  private ehDiaUtil(data: Date) {
    return data.getDay() > DiasDaSemana.DOMINGO 
        && data.getDay() < DiasDaSemana.SABADO;
  }

  private limparFormulario (): void {
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';

    this.inputData.focus();
  }

  private atualizaView (): void {
    this.negociacoesView.update(this.negociacoes);

    this.mensagemView.update('Negociação adicionada com sucesso!')
  }
}
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

class PxtNotificacao {
  severity: string;
  summary: string;
  detail: string;
  key: string;
  closable: boolean = true;
  life: number = 600000;
}

@Injectable({
  providedIn: 'root'
})
export class PxtNotificacaoService {

  constructor(public messageService: MessageService) { }

  clear(codigoNotificacao?) {
    if (this.messageService)
      if (codigoNotificacao)
        this.messageService.clear(codigoNotificacao);
      else
        this.messageService.clear();
  }

  informacao(mensagem: string, limparAnteriores?: boolean, titulo?: string, codigoNotificacao?: string, segundosExibicao?: number) {
    if (limparAnteriores) {
      this.clear(codigoNotificacao);
    }
    let obj = new PxtNotificacao();
    obj.severity = 'info';
    obj.detail = mensagem;
    obj.summary = titulo ? titulo : 'Informação';
    obj.key = codigoNotificacao ? codigoNotificacao : 'pxt-notificacao';
    obj.life = (segundosExibicao && segundosExibicao > -1) ? segundosExibicao * 1000 : 600000;
    this.messageService.add(obj);
  }

  aviso(mensagem: string, titulo?: string, limparAnteriores?: boolean, codigoNotificacao?: string, segundosExibicao?: number) {
    if (limparAnteriores) {
      this.clear(codigoNotificacao);
    }
    let obj = new PxtNotificacao();
    obj.severity = 'warn';
    obj.detail = mensagem;
    obj.summary = titulo ? titulo : 'Aviso';
    obj.key = codigoNotificacao ? codigoNotificacao : 'pxt-notificacao';
    obj.life = (segundosExibicao && segundosExibicao > -1) ? segundosExibicao * 1000 : 600000;
    this.messageService.add(obj);
  }

  erro(mensagem: string, titulo?: string, limparAnteriores?: boolean, codigoNotificacao?: string, segundosExibicao?: number) {
    if (limparAnteriores) {
      this.clear(codigoNotificacao);
    }
    let obj = new PxtNotificacao();
    obj.severity = 'error';
    obj.detail = mensagem;
    obj.summary = titulo ? titulo : 'Erro';
    obj.key = codigoNotificacao ? codigoNotificacao : 'pxt-notificacao';
    obj.life = (segundosExibicao && segundosExibicao > -1) ? segundosExibicao * 1000 : 600000;
    this.messageService.add(obj);
  }

  sucesso(mensagem: string, titulo?: string, limparAnteriores?: boolean, codigoNotificacao?: string, segundosExibicao?: number) {
    if (limparAnteriores) {
      this.clear(codigoNotificacao);
    }
    let obj = new PxtNotificacao();
    obj.severity = 'success';
    obj.detail = mensagem;
    obj.summary = titulo ? titulo : 'Sucesso';
    obj.key = codigoNotificacao ? codigoNotificacao : 'pxt-notificacao';
    obj.life = (segundosExibicao && segundosExibicao > -1) ? segundosExibicao * 1000 : 600000;
    this.messageService.add(obj);
  }

}

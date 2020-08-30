import { AppComponent } from '../../app.component';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

class Notificacao {
  severity: string;
  summary: string;
  detail: string;
  key: string;
  closable: boolean = true;
  life: number = 120000;
}

@Injectable({
  providedIn: 'root'
})
export class MensagemDialogService {

  constructor(public messageService: MessageService, public app: AppComponent) { }

  informacao(mensagem: string, limparAnteriores?: boolean, titulo?: string, codigoNotificacao?: string) {
    this.app.mostrarDialogMensagem = true;
    if (limparAnteriores) {
      this.messageService.clear();
    }
    let obj = new Notificacao();
    obj.severity = 'info';
    obj.detail = mensagem;
    obj.summary = titulo ? titulo : 'Informação';
    obj.key = codigoNotificacao ? codigoNotificacao : 'inova-notificacao';
    this.messageService.add(obj);
  }

  aviso(mensagem: string, titulo?: string, limparAnteriores?: boolean, codigoNotificacao?: string) {
    if (limparAnteriores) {
      this.messageService.clear();
    }
    let obj = new Notificacao();
    obj.severity = 'warn';
    obj.detail = mensagem;
    obj.summary = titulo ? titulo : 'Aviso';
    obj.key = codigoNotificacao ? codigoNotificacao : 'inova-notificacao';
    this.messageService.add(obj);
  }

  erro(mensagem: string, titulo?: string, limparAnteriores?: boolean, codigoNotificacao?: string) {
    if (limparAnteriores) {
      this.messageService.clear();
    }
    let obj = new Notificacao();
    obj.severity = 'error';
    obj.detail = mensagem;
    obj.summary = titulo ? titulo : 'Erro';
    obj.key = codigoNotificacao ? codigoNotificacao : 'inova-notificacao';
    this.messageService.add(obj);
  }

  sucesso(mensagem: string, titulo?: string, limparAnteriores?: boolean, codigoNotificacao?: string) {
    if (limparAnteriores) {
      this.messageService.clear();
    }
    let obj = new Notificacao();
    obj.severity = 'success';
    obj.detail = mensagem;
    obj.summary = titulo ? titulo : 'Sucesso';
    obj.key = codigoNotificacao ? codigoNotificacao : 'inova-notificacao';
    this.messageService.add(obj);
  }

}

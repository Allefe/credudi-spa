import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pxt-mensagem-erro',
  templateUrl: './pxt-mensagem-erro.component.html',
  styleUrls: ['./pxt-mensagem-erro.component.scss']
})
export class PxtMensagemErroComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() mensagem: string = 'Campo obrigatório';

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pxt-mensagem-dialog',
  templateUrl: './pxt-mensagem-dialog.component.html',
  styleUrls: ['./pxt-mensagem-dialog.component.scss']
})
export class PxtMensagemDialogComponent implements OnInit {

  @Input() display: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}

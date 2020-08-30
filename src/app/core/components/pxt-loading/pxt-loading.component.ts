import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pxt-loading',
  templateUrl: './pxt-loading.component.html',
  styleUrls: ['./pxt-loading.component.css']
})
export class PxtLoadingComponent implements OnInit {

  @Input() loading?: boolean = false;
  @Input() mensagem: string = "Aguarde...";

  constructor() { }

  ngOnInit() {
  }

}

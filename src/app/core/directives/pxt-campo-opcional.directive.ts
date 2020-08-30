import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[pxtOpcional]'
})
export class PxtCampoOpcionalDirective  implements AfterViewInit {

  constructor(public el: ElementRef) { }

  ngAfterViewInit() {
    let labelAntigo = this.el.nativeElement.innerText;
    let novoLabel = labelAntigo + '<smal><i style="font-size:11px;color:#a5a5a5"> - Opcional</i></smal>';
    this.el.nativeElement.innerHTML = novoLabel;
  }

}

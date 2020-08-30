import { TabelaDinamicaModule } from './dynamic-table/tabela-dinamica.module';
import { PxtToolbarButtonsModule } from 'src/app/core/components/pxt-toolbar-buttons/pxt-toolbar-buttons.module';
import { PxtMensagemDialogModule } from './pxt-mensagem-dialog/pxt-mensagem-dialog.module';
import { PxtMensagemErroModule } from './pxt-mensagem-erro/pxt-mensagem-erro.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PxtMensagemErroModule,
    PxtMensagemDialogModule,
    PxtToolbarButtonsModule,
    TabelaDinamicaModule,
  ],
  exports: [
    PxtMensagemErroModule,
    PxtMensagemDialogModule,
    PxtToolbarButtonsModule,
    TabelaDinamicaModule,
  ]
})
export class CoreComponentsModule { }

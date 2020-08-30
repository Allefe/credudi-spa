import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PxtMensagemDialogComponent } from './pxt-mensagem-dialog.component';

@NgModule({
  declarations: [PxtMensagemDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
  ],
  exports: [
    PxtMensagemDialogComponent
  ]
})
export class PxtMensagemDialogModule { }

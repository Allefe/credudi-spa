import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PxtToolbarButtonsComponent } from './pxt-toolbar-buttons.component';
import { ToolbarModule } from 'primeng/primeng';

@NgModule({
  declarations: [PxtToolbarButtonsComponent],
  imports: [
    CommonModule,
    ToolbarModule
  ],
  exports: [
    PxtToolbarButtonsComponent
  ]
})
export class PxtToolbarButtonsModule { }

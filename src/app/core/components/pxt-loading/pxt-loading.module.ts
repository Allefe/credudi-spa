import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PxtLoadingComponent } from './pxt-loading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PxtLoadingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [PxtLoadingComponent]
})
export class PxtLoadingModule { }

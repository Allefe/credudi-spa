import { CurrencyFormatPipe } from './currency-format.pipe';
import { SafeHtmlPipe } from './safehtml.pipe';
import { PxtSimNaoPipe } from './pxt-sim-nao.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PxtDefaultPipe } from './pxt-default.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PxtSimNaoPipe,
    PxtDefaultPipe,
    SafeHtmlPipe,
    CurrencyFormatPipe,
  ],
  exports: [
    PxtSimNaoPipe,
    PxtDefaultPipe,
    SafeHtmlPipe,
    CurrencyFormatPipe,
  ]
})
export class CorePipesModule { }

import { NumbersOnlyDirective } from './numbers-only.directive';
import { UserInRuleDirective } from './user.in.rule.directive';
import { UppercaseInputDirective } from './uppercase.directive';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PxtCampoOpcionalDirective } from './pxt-campo-opcional.directive';
import { PxtNumberDirective } from './pxt-number.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PxtCampoOpcionalDirective,
    PxtNumberDirective,
    UserInRuleDirective,
    UppercaseInputDirective,
    NumbersOnlyDirective,
  ],
  exports: [
    PxtCampoOpcionalDirective,
    PxtNumberDirective,
    UserInRuleDirective,
    UppercaseInputDirective,
    NumbersOnlyDirective,
  ]
})
export class CoreDirectivesModule { }

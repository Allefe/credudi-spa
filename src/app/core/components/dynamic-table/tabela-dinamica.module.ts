import { CoreDirectivesModule } from './../../directives/core-directives.module';
import { CorePipesModule } from './../../pipes/core-pipes.module';
import { PrimengCustomModule } from 'src/app/shared/modules/primeng-custom.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaDinamicaComponent } from './tabela-dinamica.component';

@NgModule({
  declarations: [TabelaDinamicaComponent],
  exports: [TabelaDinamicaComponent],
  entryComponents: [TabelaDinamicaComponent],
  imports: [
    CommonModule,
    PrimengCustomModule,
    CorePipesModule,
    CoreDirectivesModule
  ]
})
export class TabelaDinamicaModule { }
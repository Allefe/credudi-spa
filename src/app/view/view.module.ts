import { InicioComponent } from '../view/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreComponentsModule } from './../core/components/core-components.module';
import { CoreDirectivesModule } from './../core/directives/core-directives.module';
import { CorePipesModule } from './../core/pipes/core-pipes.module';
import { SharedModule } from './../shared/shared.module';
import { PxtToolbarButtonsModule } from 'src/app/core/components/pxt-toolbar-buttons/pxt-toolbar-buttons.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CronJobsModule } from 'ngx-cron-jobs';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TinymceModule } from 'angular2-tinymce';
import { NguCarouselModule } from '@ngu/carousel';
import {TableModule} from 'primeng/table';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { LoginModule } from './auth/login/login.module';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { ConsultaUsuarioComponent } from './usuario/consulta-usuario/consulta-usuario.component';
import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/cadastro-usuario.component';
import { AssociarPerfilPrivilegiosComponent } from './configuracoes-acesso/associar-perfil-privilegios/associar-perfil-privilegios.component';
import { InfoBuscaDetalhadaComponent } from './consultas/info-busca-detalhada/info-busca-detalhada.component';

@NgModule({
  imports: [
    SharedModule,
    CoreComponentsModule,
    CorePipesModule,
    CoreDirectivesModule,
    ReactiveFormsModule,
    CronJobsModule,
    PasswordStrengthMeterModule,
    BrowserAnimationsModule,
    NguCarouselModule,
    PxtToolbarButtonsModule,
    TableModule,
    CurrencyMaskModule,
    LoginModule,
    NgxViacepModule,
    PdfViewerModule,
    TinymceModule.withConfig({ }),
  ],
  declarations: [
    InicioComponent,
    ConsultaUsuarioComponent,
    CadastroUsuarioComponent,
    AssociarPerfilPrivilegiosComponent,
    InfoBuscaDetalhadaComponent,
  ],
  exports: [
    InicioComponent,
    LoginModule,
  ],
  providers:[
    DatePipe
  ]
})
export class ViewModule { }

import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarPrimeLanguage } from './../../../shared/models/constants/CalendarPrimeLanguage';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/models/CredUdi/Usuario.model';
import { SelectItem } from 'primeng/api';
import { PxtNotificacaoService } from 'src/app/core/services/pxt.notificacao.service';
import { CpfService } from 'src/app/core/services/cpf.service';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { LoggedUserService } from 'src/app/core/services/logged.user.service';
import { Perfil } from 'src/app/core/models/CredUdi/Perfil.model';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  localePt = CalendarPrimeLanguage.pt;

  editando: boolean = false;
  usuario: Usuario = new Usuario();
  perfis: SelectItem[];
  status: SelectItem[];
  senhaFraca: boolean = false;

  iconView = 'visibility_off';
  tipoCampo = 'password';
  strength: any;

  constructor(

    private notificacao: PxtNotificacaoService,
    public cpfService: CpfService,
    private router: Router,
    private _route: ActivatedRoute,
    private datePipe: DatePipe,
    private breadcrumbService: BreadcrumbService,
    private httpService: HttpService,
    private http: HttpClient,
    private loggedUserService: LoggedUserService,
  ) {
    
    this.breadcrumbService.setItems([
      { label: 'Usuario' },
      { label: 'Consulta', routerLink: ['usuario/consulta'] },
      { label: 'Cadastro', routerLink: ['usuario/cadastro'] },
    ]);
    
    this.status = [
      { label: "ATIVO", value: "ATIVO" },
      { label: "INATIVO", value: "INATIVO" },
      { label: "BLOQUEADO", value: "BLOQUEADO" },
    ];
  }

  async ngOnInit() {
    await this.buscarPerfis();
    this._route.queryParams.subscribe(params => {
      if (params.codigo !== undefined && params.codigo !== '' && params.codigo !== null) {
        this.editando = true;
        let usuarioConsulta: Usuario = new Usuario();
        usuarioConsulta.codigo = params.codigo;
        this.httpService.Post<any>('usuario/filtro', usuarioConsulta ).subscribe(val => {
          if(val.status = true){
            this.usuario = val.data[0];
            if(ValidationUtils.isNotUndefinedAndNotNull(this.usuario.dataCadastro)){
              this.usuario.dataCadastro = new Date(this.datePipe.transform(this.usuario.dataCadastro, 'MM/dd/yyyy'));
            }else{
              this.usuario.dataCadastro = undefined;
            }
            if(ValidationUtils.isNotUndefinedAndNotNull(this.usuario.dataInicioBloqueio) &&
            ValidationUtils.isNotUndefinedAndNotNull(this.usuario.dataFimBloqueio)){
              this.usuario.dataInicioBloqueio = new Date(this.datePipe.transform(this.usuario.dataInicioBloqueio, 'MM/dd/yyyy'));
              this.usuario.dataFimBloqueio = new Date(this.datePipe.transform(this.usuario.dataFimBloqueio, 'MM/dd/yyyy'));
            }else{
              this.usuario.dataInicioBloqueio = undefined;
              this.usuario.dataFimBloqueio = undefined;
            }
          
          }else{
            this.notificacao.aviso('Nenhum registro encontrado para os critérios de busca','', true, undefined, 5);
          }
        });
      } else {
        this.editando = false;
        this.usuario.status = 'ATIVO';
        this.usuario.dataCadastro = new Date();
        this.router.navigate(['/usuario/cadastro']);
      }
    });
  }

  salvar(){
    
    if(!ValidationUtils.isNotUndefinedAndNotNull(this.usuario.nome) || this.usuario.nome == ""){
      this.notificacao.aviso('Informe o nome de usuário', undefined, false, null, 5);
      return;
    }

    if(!ValidationUtils.isNotUndefinedAndNotNull(this.usuario.codigoPerfil)){
      this.notificacao.aviso('Informe o campo perfil', undefined, false, null, 5);
      return;
    }
    
    if(!ValidationUtils.isNotUndefinedAndNotNull(this.usuario.login)){
      this.notificacao.aviso('Informe o campo Login', undefined, false, null, 5);
      return;
    }

    if(!ValidationUtils.isNotUndefinedAndNotNull(this.usuario.senha)){
      this.notificacao.aviso('Informe o campo Senha', undefined, false, null, 5);
      return;
    }

    if(this.strength <= 3){
      this.senhaFraca = true;
      this.notificacao.aviso('Informe uma senha mais forte', undefined, false, null, 5);
      return;
    }

    this.httpService.Post<any>('usuario/salvar', this.usuario, {}, true, false).subscribe(res => {
      if(res.status == true){
        this.usuario = res.data[0];
        this.notificacao.sucesso('Salvo com sucesso', '', true, null, 5);
      }else{
        this.notificacao.erro('Não foi possível salvar usuário');
      }
    });
  }

  atualizar(){
    this.httpService.Post<any>('usuario/salvar', this.usuario, {}, true, false).subscribe(res => {
      if(res.status == true){
        this.usuario = res.data[0];
        this.notificacao.sucesso('Atualizado com sucesso', '', true, null, 5);
      }else{
        this.notificacao.erro('Não foi possível atualizar usuário');
      }
    });
  }

  async buscarPerfis(){
    return new Promise(resolve => {
      this.httpService.Get<any>('perfil/todos').subscribe(res => {
        if(res){
          this.perfis = [];
          debugger;
          for (let cv of res.data) {
            this.perfis.push({ label: `${cv.codigo} - ${cv.descricao}`, value: cv.codigo });
          }
        }
        resolve(true);
      });
    });
  }

  onPasswordStrengthChanged(strength) {
    this.strength = strength;
  }

  alterarCampoSenha(){

    if(this.iconView == 'visibility'){
      this.iconView = 'visibility_off';
    }else{
      this.iconView = 'visibility';
    }
    if(this.tipoCampo == 'password'){
      this.tipoCampo = 'text';
    }else{
      this.tipoCampo = 'password';
    }
  }

}

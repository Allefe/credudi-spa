import { LoggedUserService } from './../../core/services/logged.user.service';
import { UsuarioSeguranca } from './../../core/models/sgi/UsuarioSeguranca.model';
import { environment } from 'src/environments/environment';
import { PxtNotificacaoService } from './../../core/services/pxt.notificacao.service';
import { HttpService } from 'src/app/core/services/http.service';
import { HelperConfigService } from './../../core/services/helper.config.service';
import { BreadcrumbService } from './../../breadcrumb.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

declare var require: any;
const KEY_CNV_USR_LOGGED = "CNVUSRLGD";


var package_json = require('package.json');

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  nomeSistema = package_json.name;
  versao = package_json.version;
  urlImagem = '';

  usuarioLogado: UsuarioSeguranca = new UsuarioSeguranca();
  //clienteLogado: Cliente = new Cliente();
  convenio: string;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private helperConfigService: HelperConfigService,
    private pxtHttpService: HttpService,
    private notificacao: PxtNotificacaoService,
    private loggedUserService: LoggedUserService
  ) {
      this.breadcrumbService.setItems([
        { label: 'Inicio', routerLink: [''] },
      ]);
  }

  ngOnInit() {
    //this.urlImagem = this.helperConfigService.getUrlFtpAtual() + this.helperConfigService.getPathImagem('PXT_INICIO');
    this.urlImagem = './../../../assets/images/Logo.png';
    //this.buscaClienteSalvaSessao();
    this.loggedUserService.loggedUser.subscribe(usuario => {
      if (usuario)
        this.usuarioLogado = {...usuario};
    });
  }

  /* buscaClienteSalvaSessao(){
    //busca o cliente logado e salva na sessao o codigo de convenio do mesmo, que 
    //será utilizado para futuras requisicoes

    this.convenio = localStorage.getItem(environment.convenioClienteLogado);

    //se não houver nada no localStorage busca novamente.
    if(this.convenio == undefined || this.convenio == null){

      const usrlgd = localStorage.getItem("USRLGDSMC");
      let usuario: UsuarioStorage = new UsuarioStorage();
      let usuarioBase64: string = atob(usrlgd);
      usuario = JSON.parse(usuarioBase64);
      this.usuarioLogado = usuario;
      console.log(this.usuarioLogado);
      
      this.pxtHttpService.Get<any>(`smc/usuarios-convenio/convenios-usuario/${this.usuarioLogado.codigo}`).subscribe(res => {
        if(res){
          // Cria um item "CNVUSRLGD" => convenioClienteLogado com valor do convenio obtido na cosulta do cliente
          window.localStorage.setItem(environment.convenioClienteLogado, JSON.stringify(res));
        } else {
          this.notificacao.aviso('Não foi encontrado cliente para usario Logado, favor contactar o suporte!','', true, undefined, 5);
        }
      });
      //let params = new HttpParams();
      //params = params.append('nome', this.usuarioLogado.pessoa.nome);
      //this.pxtHttpService.Get<Cliente>('smc/cliente/buscarCliente', {params:params}).subscribe(res => {
        //if(res){
          //this.clienteLogado = res;
          //console.log(this.clienteLogado);

          // Cria um item "CNVUSRLGD" => convenioClienteLogado com valor do convenio obtido na cosulta do cliente
          //window.localStorage.setItem(environment.convenioClienteLogado, this.clienteLogado.codigoConvenio.toString());

        //}else{
          //this.notificacao.aviso('Não foi encontrado cliente para usario Logado, favor contactar o suporte!','', true, undefined, 5);
        //}
      //});
    }
  } */

}

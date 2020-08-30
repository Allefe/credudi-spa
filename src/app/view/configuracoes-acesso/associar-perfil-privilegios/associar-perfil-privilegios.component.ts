import { element } from 'protractor';
import { Privilegio } from './../../../core/models/CredUdi/Privilegio.model';
import { PerfilPrivilegio } from './../../../core/models/CredUdi/PerfilPrivilegio.model';
import { SelectItem } from 'primeng/api';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { HttpService } from 'src/app/core/services/http.service';
import { TablePrimeColumOptions } from './../../../core/models/TablePrimeColumOptions';
import { Perfil } from './../../../core/models/CredUdi/Perfil.model';
import { Component, OnInit } from '@angular/core';
import { PxtNotificacaoService } from 'src/app/core/services/pxt.notificacao.service';
import { BreadcrumbService } from 'src/app/breadcrumb.service';

@Component({
  selector: 'app-associar-perfil-privilegios',
  templateUrl: './associar-perfil-privilegios.component.html',
  styleUrls: ['./associar-perfil-privilegios.component.scss']
})
export class AssociarPerfilPrivilegiosComponent implements OnInit {

  //váriaveis de perfil
  perfil: Perfil = new Perfil();
  perfilSelecionado: Perfil = new Perfil();
  perfilSelecionadoDelete: Perfil = new Perfil();
  perfisLista: Perfil[] = [];
  mensagem: string;
  editandoPerfil: boolean = false;
  showDialogDelete: boolean = false;

  colunasTabelaPerfil: TablePrimeColumOptions[] = [
    { header: 'Código', field: 'codigo', width: '20%', align: 'center' },
    { header: 'Descrição', field: 'descricao'},
    { width: '40px', buttonField: true, iconButton: 'edit', tooltip: 'Editar',  command: (data) => this.editarPerfil(data) },
    { width: '40px', buttonField: true, iconButton: 'delete', tooltip: 'Deletar', command: (data) => this.abrirDialogDeletePerfil(data)},
  ];

  //váriaveis do privilegio

  privilegio: Privilegio = new Privilegio();
  privilegoioSelecionado: Privilegio = new Privilegio();
  privilegoioSelecionadoDelete: Privilegio = new Privilegio();
  listaPrivilegios: Privilegio[] = [];
  mensagemDialogoPrivilegio: string;
  showDialogDeletePrivilegio: boolean = false;
  editandoPrivilegio: boolean = false;
  

  colunasTabelaPrivilegio: TablePrimeColumOptions[] = [
    { header: 'Código', field: 'codigo', width: '20%', align: 'center' },
    { header: 'Descrição', field: 'descricao'},
    { header: 'Tela', field: 'tela'},
    { width: '40px', buttonField: true, iconButton: 'edit', tooltip: 'Editar',  command: (data) => this.editarPrivilegio(data) },
    { width: '40px', buttonField: true, iconButton: 'delete', tooltip: 'Deletar', command: (data) => this.abrirDialogDeletePrivilegio(data)},
  ];

  privilegiosDisponiveis: Privilegio[] = [];
  privilegiosPerfil: PerfilPrivilegio[] = [];
  privilegiosPerfilComparar: Privilegio[] = [];
  perfilPrivilegioAssociados: PerfilPrivilegio[] = []; 

  perfis: SelectItem[];
  codigoPerfil: number;

  colunasTabelaPrivilegiosDisponiveis: TablePrimeColumOptions[] = [
    { header: 'Código', field: 'codigo', width: '20%', align: 'center' },
    { header: 'Descrição', field: 'descricao'},
    { width: '40px', buttonField: true, iconButton: 'add', tooltip: 'Adicionar',  command: (data) => this.adicionarAssociacaoPrivilegio(data) },
  ];

  colunasTabelaPrivilegiosAssociados: TablePrimeColumOptions[] = [
    { header: 'Código', field: 'privilegio.codigo', width: '20%', align: 'center' },
    { header: 'Descrição', field: 'privilegio.descricao'},
    { width: '40px', buttonField: true, iconButton: 'delete', tooltip: 'Deletar', command: (data) => this.desassociarPrivilegio(data)},
  ];

  constructor(
    private httpService: HttpService,
    private notificacao: PxtNotificacaoService,
    private breadcrumbService: BreadcrumbService,
  ) { }

  ngOnInit() {
    this.httpService.Get<any>('perfil/todos', {}, true, false).subscribe(val => {
      if(val.status == true){
        this.perfisLista = [...val.data];
      }else{
        this.notificacao.aviso('Não foi perfis', null, true, undefined, 5);
      }
    });
  }

  abrirDialogDeletePerfil(perfil: Perfil){
    this.perfilSelecionadoDelete = perfil;
    this.mensagem = "Tem certeza de que deseja excluir o Perfil " + this.perfilSelecionadoDelete.codigo + " - " + this.perfilSelecionadoDelete.descricao + "?";
    this.showDialogDelete = true;
  }

  fecharDialogDeletePerfil(){
    this.showDialogDelete = false;
  }

  editarPerfil(perfilSelecionado: Perfil){
    this.perfil = perfilSelecionado;
  }

  deletarPerfil(){
    this.httpService.Post<any>('perfil/deletar', this.perfilSelecionadoDelete, {}, true, false).subscribe(res => {
      if(res.status == true){
        this.notificacao.sucesso('Deletado com sucesso', '', true, null, 5);
      }else{
        this.notificacao.erro('Não foi possível deletar o perfil');
      }
      this.buscarPerfis();
    });
  }

  salvarPerfil(){
    if(ValidationUtils.isNotUndefinedAndNotNull(this.perfil.descricao) || this.perfil.descricao == ""){
      this.notificacao.aviso('Informe a descrição', null, true, undefined, 5);
      return;
    }
    this.httpService.Post<any>('perfil/salvar', this.perfil, {}, true, false).subscribe(res => {
      if(res.status == true){
        this.notificacao.sucesso('Salvo com sucesso', '', true, null, 5);
      }else{
        this.notificacao.erro('Não foi possível salvar o perfil');
      }
      this.buscarPerfis();
    });

  }

  buscarPerfis(){
    this.httpService.Get<any>('perfil/todos', {}, true, false).subscribe(val => {
      if(val.status == true){
        this.perfisLista = [...val.data];
      }else{
        this.notificacao.aviso('Não foi possível buscar os perfis', null, true, undefined, 5);
      }
    });
  }

  buscarPerfisAssociacao(){
    this.httpService.Get<any>('perfil/todos').subscribe(res => {
      if(res){
        this.perfis = [];
        for (let cv of res.data) {
          this.perfis.push({ label: `${cv.codigo} - ${cv.descricao}`, value: cv.codigo });
        }
      }
    });
  }

  onTabChange(event) {
    //this.notificacao.aviso(event.index,'', true, undefined, 5);
    if(event.index == 1){
      this.buscarPrivilegios();
    }
    if(event.index == 2){
      this.buscarPerfisAssociacao();
      this.buscarPrivilegiosDisponiveis();
    }
  }

  buscarPrivilegios(){
    this.httpService.Get<any>('privilegio/todos', {}, true, false).subscribe(val => {
      if(val.status == true){
        this.listaPrivilegios = [...val.data];
      }else{
        this.notificacao.aviso('Não foi possível buscar os privilégios', null, true, undefined, 5);
      }
    });
  }

  abrirDialogDeletePrivilegio(privilegio: Privilegio){
    this.privilegoioSelecionadoDelete = privilegio;
    this.mensagemDialogoPrivilegio = "Tem certeza de que deseja excluir o Privilégio " + this.privilegoioSelecionadoDelete.codigo + " - " + this.privilegoioSelecionadoDelete.descricao + "?";
    this.showDialogDeletePrivilegio = true;
  }

  fecharDialogDeletePrivilegio(){
    this.showDialogDeletePrivilegio = false;
  }

  editarPrivilegio(privilegioSlecionado: Privilegio){
    this.editandoPrivilegio = true;
    this.privilegio = privilegioSlecionado;
  }

  deletarPrivilegio(){
    this.httpService.Post<any>('privilegio/deletar', this.privilegoioSelecionadoDelete, {}, true, false).subscribe(res => {
      if(res.status == true){
        this.notificacao.sucesso('Deletado com sucesso', '', true, null, 5);
      }else{
        this.notificacao.erro('Não foi possível deletar o privilégio selecionado');
      }
      this.buscarPrivilegios();
    });
  }

  buscarPrivilegiosDisponiveis(){
    this.httpService.Get<any>('privilegio/todos', {}, false, false).subscribe(val => {
      if(val.status == true){
        this.privilegiosDisponiveis = [...val.data];
      }else{
        this.notificacao.aviso('Não foi possível buscar os privilégios', null, true, undefined, 5);
      }
    });
  }

  buscarPerfilPrivilegio(){
    this.buscarPrivilegiosDisponiveis();
    let perfilPrivilegio: PerfilPrivilegio = new PerfilPrivilegio();
    perfilPrivilegio.codigoPerfil = this.codigoPerfil;
    this.httpService.Post<any>('perfilprivilegio/filtro', perfilPrivilegio, {}, true, false).subscribe(res => {
      if(res.status == true){
        this.privilegiosPerfil = [...res.data];
        this.privilegiosPerfil.forEach(element=>{
          let privilegio: Privilegio = new Privilegio()
          privilegio = element.privilegio;
          //varre a lista de privilegios disponiveis
          for(var i=0; i < this.privilegiosDisponiveis.length; i++) {
            if(this.privilegiosDisponiveis[i].descricao === element.privilegio.descricao) {
              this.privilegiosDisponiveis.splice(this.privilegiosDisponiveis.indexOf(this.privilegiosDisponiveis[i]), 1);
            }
          }
        });
      }else{
        this.notificacao.erro('Não foi possível deletar o privilégio selecionado');
      }
    });
  }

  adicionarAssociacaoPrivilegio(privilegio: Privilegio){
    console.log(JSON.stringify(privilegio));
    //adicionar novo privilegio a lista para salvar depois
    //adicionar indListaPrivilegio ao montar objeto

    let perfilPrivilegio: PerfilPrivilegio = new PerfilPrivilegio();
    perfilPrivilegio.codigoPerfil = this.codigoPerfil;
    perfilPrivilegio.codigoPrivilegio = privilegio.codigo;
    perfilPrivilegio.privilegio = privilegio;
    perfilPrivilegio.indListaPrivilegio = true;
    this.privilegiosPerfil.push(perfilPrivilegio);

    //remove da lista de clientes ativos
    this.privilegiosDisponiveis.splice(this.privilegiosDisponiveis.indexOf(privilegio), 1);
    this.privilegiosDisponiveis = [...this.privilegiosDisponiveis];
  }

  desassociarPrivilegio(perfilPrivilegio: PerfilPrivilegio){
    console.log(JSON.stringify(perfilPrivilegio));

    if(perfilPrivilegio.indListaPrivilegio == true){
      //adiciona na lista disponíveis novamente
      this.privilegiosDisponiveis.push(perfilPrivilegio.privilegio);

      //remove da lista de associados
      this.privilegiosPerfil.splice(this.privilegiosPerfil.indexOf(perfilPrivilegio), 1);
      this.privilegiosPerfil = [...this.privilegiosPerfil];
    }else{

      this.httpService.Post<any>('perfilprivilegio/deletar', perfilPrivilegio, {}, true).subscribe(val => {
        if(val.status == true){
          this.privilegiosDisponiveis = [...val.data];
        }else{
          this.notificacao.aviso('Não foi possível buscar os privilégios', null, true, undefined, 5);
        }
      });
      this.buscarPerfilPrivilegio();
    }
  }

  salvarPerfilPrivilegio(){

  }
}

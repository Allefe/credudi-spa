import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { Component, OnInit } from '@angular/core';
import { TablePrimeColumOptions } from 'src/app/core/models/TablePrimeColumOptions';
import { Usuario } from 'src/app/core/models/CredUdi/Usuario.model';
import { PxtNotificacaoService } from 'src/app/core/services/pxt.notificacao.service';
import { BreadcrumbService } from 'src/app/breadcrumb.service';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.scss']
})
export class ConsultaUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioSelecionado: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  mostrarDialogDelete: boolean = false;
  mensagem: string;
  status: SelectItem[];

  filtroCodigoUsuario: number;
  filtroNomeUsuario: string;
  filtroLogin: number;
  filtroStatus: string;

  colunasTabelaUsuarios: TablePrimeColumOptions[] = [
    { header: 'Codigo', field: 'codigo', width: '10%', align: 'center' },
    { header: 'Nome', field: 'nome', width: '20%', align: 'center' },
    { header: 'Login', field: 'login', align: 'center' },
    { header: 'Data Cadastro', field: 'dataCadastro',  dateField: true, datePipe: 'dd/MM/yyyy', align: 'center' },
    { header: 'Status' , field:'status', align: 'center' },
    { header: 'Perfil', field: 'perfil.descricao', align: 'center' },
    { width: '40px', buttonField: true, iconButton: 'edit', tooltip: 'Editar',  command: (data) => this.editar(data) },
    { width: '40px', buttonField: true, iconButton: 'delete', tooltip: 'Deletar', command: (data) => this.abrirDialogDelete(data)},
  ];

  constructor(
    private httpService: HttpService,
    private notificacao: PxtNotificacaoService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
  ) { 

    this.breadcrumbService.setItems([
      { label: 'Usuario' },
      { label: 'Consulta', routerLink: ['usuario/consulta'] },
    ]);

    this.status = [
      { label: "ATIVO", value: "ATIVO" },
      { label: "INATIVO", value: "INATIVO" },
      { label: "BLOQUEADO", value: "BLOQUEADO" },
    ];
  }

  ngOnInit() {
    this.httpService.Get<any>('usuario/todos', {}, true, false).subscribe(val => {
      if(val.status == true){
        this.usuarios = [...val.data];
      }else{
        this.notificacao.aviso('Não foi encontrado usuários', null, true, undefined, 5);
      }
    });
  }

  editar(usuario: Usuario){
    this.router.navigate(['/usuario/cadastro'], { queryParams: { codigo: usuario.codigo } })
  }

  deletar(){
    this.httpService.Post<any>('usuario/deletar', this.usuarioSelecionado, {}, true, false).subscribe(res => {
      if(res.status == true){
        this.mostrarDialogDelete = false;
        this.notificacao.sucesso('Deletado com sucesso', '', true, null, 5);
      }else{
        this.notificacao.erro('Não foi possível deletar o usuário');
        this.mostrarDialogDelete = false;
      }
      this.buscar();
    });
  }

  limpar(){
    this.usuario.codigo = undefined;
    this.usuario.nome = undefined;
    this.usuario.login = undefined;
    this.usuario.status = undefined;
  }

  fecharDialogDelete(){
    this.mostrarDialogDelete = false;
  }

  abrirDialogDelete(usuario: Usuario){
    this.mostrarDialogDelete = true;
    this.mensagem = 'Tem certeza que deseja excluir o usuário ' + usuario.codigo + ' - ' + usuario.nome;
    this.usuarioSelecionado = usuario;
  }

  buscar(){
    if(this.isCamposVazios()){
      this.httpService.Get<any>('usuario/todos', {}, true, false).subscribe(val => {
          if(val.status == true){
            this.usuarios = [...val.data];
          }else{
            this.notificacao.aviso('Não foi encontrado usuários', null, true, undefined, 5);
          }
      });
    }else{
      this.httpService.Post<any>('usuario/filtro', this.usuario ).subscribe(val => {
        if(val.status = true){
          debugger;
          this.usuarios = [...val.data];
        }else{
          this.notificacao.aviso('Nenhum registro encontrado para os critérios de busca','', true, undefined, 5);
        }
      });
    }
  }

  isCamposVazios(){
    if((!ValidationUtils.isNotUndefinedAndNotNull(this.usuario.codigo) || this.usuario.codigo.toString() == "") &&
    (!ValidationUtils.isNotUndefinedAndNotNull(this.usuario.nome) || this.usuario.nome == "") &&
    (!ValidationUtils.isNotUndefinedAndNotNull(this.usuario.login) || this.usuario.login == "") &&
    (!ValidationUtils.isNotUndefinedAndNotNull(this.usuario.status) || this.usuario.status == "")){
      return true;
    }else{
      return false;
    }
  }
}

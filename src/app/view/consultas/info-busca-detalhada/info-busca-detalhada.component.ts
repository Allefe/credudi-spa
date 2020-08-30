import { UnidadeFederativa } from './../../../core/models/enumerations/unidadeFederativa.enum';
import { SelectItem } from 'primeng/api';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { CadastralInfoBuscaDetalhada } from './../../../core/models/Retorno_Consultas/Busca_Detalhada/cadastralInfoBuscaDetalhada.model';
import { CnpjService } from './../../../core/services/cpnj.service';
import { CpfService } from 'src/app/core/services/cpf.service';
import { TablePrimeColumOptions } from './../../../core/models/TablePrimeColumOptions';
import { InfoBuscaDetalhadaResultados } from './../../../core/models/Retorno_Consultas/Busca_Detalhada/InfoBuscaDetalhadaResultados.model';
import { BreadcrumbService } from './../../../breadcrumb.service';
import { PxtNotificacaoService } from './../../../core/services/pxt.notificacao.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-busca-detalhada',
  templateUrl: './info-busca-detalhada.component.html',
  styleUrls: ['./info-busca-detalhada.component.scss']
})
export class InfoBuscaDetalhadaComponent implements OnInit {

  retornos: InfoBuscaDetalhadaResultados[];
  retornoInfoBasico: InfoBuscaDetalhadaResultados = new InfoBuscaDetalhadaResultados();
  retornoLocalizaDocumento: InfoBuscaDetalhadaResultados = new InfoBuscaDetalhadaResultados();

  unidadesFederativas: SelectItem[];
  mostrarDialogBusca: boolean = false;
  filtroCnpj: string;
  filtroCpf: string;
  filtroUf: string;
  tipoBusca: string = 'cpf';
  cpfValido: boolean = true;
  cnpjValido: boolean = true;
  renderizaTela: boolean = false;

  //Informações Básicas
  emailsInfoBasico: any[] = [];
  enderecosInfoBasico: any [] = [];
  telefonesInfoBasico: any[] = [];

  //Localiza Documento
  emailsLocalizaDocumento: any[] = [];
  enderecosLocalizaDocumento: any [] = [];
  telefonesLocalizaDocumento: any[] = [];

  colunasTabelaEnderecoInfoBasica: TablePrimeColumOptions[] = [
    { header: 'Logradouro', field: 'logradouro', align: 'center', width: '25%' },
    { header: 'Número', field: 'numero', align: 'center' },
    { header: 'Bairro', field: 'bairro', align: 'center', width: '25%' },
    { header: 'Cidade', field: 'cidade', align: 'center' },
    { header: 'U.F', field: 'uf', align: 'center' },
    { header: 'CEP', field: 'cep', align: 'center'},
  ];

  colunasTabelaTelefonesInfoBasica: TablePrimeColumOptions[] = [
    { header: 'ddd', field: 'ddd', align: 'center' },
    { header: 'Número', field: 'telefone', align: 'center' },
    { header: 'Tipo', field: 'tipo', align: 'center'},
  ];

  colunasTabelaEnderecoLocalizaDocumento: TablePrimeColumOptions[] = [
    { header: 'Logradouro', field: 'logradouro', align: 'center', width: '25%' },
    { header: 'Bairro', field: 'bairro', align: 'center', width: '25%' },
    { header: 'Cidade', field: 'cidade', align: 'center' },
    { header: 'U.F', field: 'uf', align: 'center' },
    { header: 'CEP', field: 'cep', align: 'center'},
  ];

  colunasTabelaTelefonesLocalizaDocumento: TablePrimeColumOptions[] = [
    { header: 'ddd', field: 'ddd', align: 'center' },
    { header: 'Número', field: 'numero', align: 'center' },
  ];


  constructor(
    private httpService: HttpService,
    public cpfService: CpfService,
    public cnpjService: CnpjService,
    private notificacao: PxtNotificacaoService,
    private breadcrumbService: BreadcrumbService,
  ) { }

  ngOnInit() {
    this.mostrarDialogBusca = true;

    this.unidadesFederativas = [
      { label: "AC - ACRE", value: UnidadeFederativa.AC },
      { label: "AL - ALAGOAS", value: UnidadeFederativa.AL },
      { label: "AP - AMAPA", value: UnidadeFederativa.AP },
      { label: "AM - AMAZONAS", value: UnidadeFederativa.AM },
      { label: "BA - BAHIA", value: UnidadeFederativa.BA },
      { label: "CE - CEARA", value: UnidadeFederativa.CE },
      { label: "DF - DISTRITO FEDERAL", value: UnidadeFederativa.DF },
      { label: "ES - ESPIRITO SANTO", value: UnidadeFederativa.ES },
      { label: "GO - GOIAS", value: UnidadeFederativa.GO },
      { label: "MA - MARANHAO", value: UnidadeFederativa.MA },
      { label: "MT - MATO GROSSO", value: UnidadeFederativa.MT },
      { label: "MS - MATO GROSSO DO SUL", value: UnidadeFederativa.MS },
      { label: "MG - MINAS GERAIS", value: UnidadeFederativa.MG },
      { label: "PA - PARA", value: UnidadeFederativa.PA },
      { label: "PB - PARAIBA", value: UnidadeFederativa.PB },
      { label: "PR - PARANA", value: UnidadeFederativa.PR },
      { label: "PE - PERNAMBUCO", value: UnidadeFederativa.PE },
      { label: "PI - PIAUI", value: UnidadeFederativa.PI },
      { label: "RJ - RIO DE JANEIRO", value: UnidadeFederativa.RJ },
      { label: "RN - RIO GRANDE DO NORTE", value: UnidadeFederativa.RN },
      { label: "RS - RIO GRANDE DO SUL", value: UnidadeFederativa.RS },
      { label: "RO - RONDONIA", value: UnidadeFederativa.RO },
      { label: "RR - RORAIMA", value: UnidadeFederativa.RR },
      { label: "SC - SANTA CATARINA", value: UnidadeFederativa.SC },
      { label: "SP - SAO PAULO", value: UnidadeFederativa.SP },
      { label: "SE - SERGIPE", value: UnidadeFederativa.SE },
      { label: "TO - TOCANTINS", value: UnidadeFederativa.TO }
      
    ];
  }


  ///codigo tipo consulta = 1 - aqui deve pegar o codigo do usuario logado tbm 
  buscar(){
    if(!ValidationUtils.isNotUndefinedAndNotNull(this.filtroUf)){
      this.notificacao.aviso('Informe uma U.F para realizar a busca', '', true, undefined, 5)
      return;
    }
    if(!ValidationUtils.isNotUndefinedAndNotNull(this.filtroCnpj) && !ValidationUtils.isNotUndefinedAndNotNull(this.filtroCpf)){
      this.notificacao.aviso('Informe um CPF ou CNPJ para realizar a busca', '', true, undefined, 5)
      return;
    }else{
      let codigoTipoConsulta = 1;
      let codigoUsuarioLogado = 5;
      if(ValidationUtils.isNotUndefinedAndNotNull(this.filtroCpf)){
        let cpf = this.filtroCpf.replace(/[^0-9]+/g,'');
        this.httpService.Get<any>(`consulta/infobuscaDetalhada/${cpf}/MG/${codigoTipoConsulta}/${codigoUsuarioLogado}`, {}, true, false).subscribe(res => {
          if(res.status == true){
            debugger;
            this.retornos = [...res.data.consulta.resultados];
            this.retornoInfoBasico = this.retornos[0];
            this.retornoInfoBasico.retorno.cpf = this.formatarStringCpf(this.retornoInfoBasico.retorno.cpf);
            this.emailsInfoBasico = this.retornoInfoBasico.retorno.email;
            
            if(this.retornoInfoBasico.retorno.enderecos.length > 0){
              this.enderecosInfoBasico = this.retornoInfoBasico.retorno.enderecos;
            }
            this.telefonesInfoBasico = this.retornoInfoBasico.retorno.telefones;
            
            this.retornoLocalizaDocumento = this.retornos[1];
            this.retornoLocalizaDocumento.retorno.cadastral.cpf = this.formatarStringCpf(this.retornoLocalizaDocumento.retorno.cadastral.cpf);
            this.emailsLocalizaDocumento = this.retornoLocalizaDocumento.retorno.email;
            
            if(this.retornoLocalizaDocumento.retorno.enderecos.length > 0){
              this.enderecosLocalizaDocumento = this.retornoLocalizaDocumento.retorno.enderecos;
            }
            this.telefonesLocalizaDocumento = this.retornoLocalizaDocumento.retorno.telefone;
            
            this.mostrarDialogBusca = false;
            this.renderizaTela = true;
            console.log(JSON.stringify(this.retornoLocalizaDocumento));
          }else{
            this.notificacao.aviso('Não foi possivel buscar os dados solicitados', null, true, undefined, 5);
          }
          this.limparFiltros('cpf');
        });
      }
    }
  }

  formatarStringCpf(cpf: string){
    let primeiroGrupoDigitos = cpf.slice(0,3);
    let segundoGrupoDigitos = cpf.slice(3,6);
    let terceiroGrupoDigitos = cpf.slice(6,9);
    let quartoGrupoDigitos = cpf.slice(9,11);
    let ponto = ".";
    let hifen = "-";
    return primeiroGrupoDigitos + ponto + segundoGrupoDigitos + ponto + terceiroGrupoDigitos + hifen + quartoGrupoDigitos;
  }

  limparFiltros(campo: string){
    if(campo == 'cpf'){
      this.filtroCpf = undefined;
      this.cpfValido = true;
    }else if(campo == 'cnpj'){
      this.filtroCnpj = undefined;
      this.cnpjValido = true;
    }else{
      this.filtroCpf = undefined;
      this.cpfValido = true;
      this.filtroCnpj = undefined;
      this.cnpjValido = true;
    }
  }

  verificarCpf(cpf: any){
    if(cpf != undefined){
      this.cpfValido = this.cpfService.validarCpf(cpf.toString());
    }else{
      this.notificacao.aviso('Informe um CPF','', true, undefined, 5);
      return;
    }
  }

  verificarCnpj(cnpj: any){
    if(cnpj != undefined){
      this.cnpjValido = this.cnpjService.validarCNPJ(cnpj);
      if(this.cnpjValido == false){
        this.notificacao.aviso('CNPJ inválido','', true, undefined, 5);
        return;
      }
    }else{
      this.notificacao.aviso('Informe um CNPJ','', true, undefined, 5);
      return;
    }
  }

  abrirFecharDialogBusca(acao: string){
    if(acao == 'abrir'){
      this.mostrarDialogBusca = true;
    }else{
      this.mostrarDialogBusca = false;
    }
  }

}

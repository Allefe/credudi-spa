import { UsuarioLogado } from './../../../core/models/UsuarioLogado';
import { PxtNotificacaoService } from './../../../core/services/pxt.notificacao.service';
import { TokenService } from './../../../core/services/token.service';
import { UserService } from './../../../core/services/user.service';
import { AuthorityService } from './../../../core/services/authority.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { HttpService } from "src/app/core/services/http.service";
import { HelperConfigService } from "src/app/core/services/helper.config.service";
import { environment } from 'src/environments/environment';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  campoObrigatorio: string = 'Campo obrigatório';
  username: string;
  password: string;
  usuarioInvalido: boolean = false;
  senhaInvalida: boolean = false;

  constructor(
    private httpService: HttpService,
    private authorityService: AuthorityService,
    private notificacao: PxtNotificacaoService,
    private tokenService: TokenService,
    ) {
  }

  ngOnInit() {
    /* this.router.navigate([{outlets: {auth: 'confirmation'}}]); */
    document.body.classList.add('login-body');

  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    document.body.classList.remove('login-body');
  }

  /**
   * Realiza login
   */
  doLogin() {
    this.usuarioInvalido = false;
    this.senhaInvalida = false;
    if (!ValidationUtils.stringNotEmpty(this.username)) {
      this.usuarioInvalido = true;
    }
    if (!ValidationUtils.stringNotEmpty(this.password)) {
      this.senhaInvalida = true;
    }
    if (this.usuarioInvalido || this.senhaInvalida) {
      return;
    }
    
    let uri = `username=${this.username}&password=${this.encodedPassword()}`;
    this.httpService.Post<UsuarioLogado>('smc/usuario/autenticar?' + uri, undefined, {}, true, true, false).subscribe(
      res => {
        console.log(res);
        // seta token
        this.tokenService.setAccessToken(res.access_token);
        // seta array de convenios associados ao usuario logado
        //localStorage.setItem(environment.chaveConveniosUsuarioLogado, btoa(JSON.stringify(res.conveniosAssociados)));
        // set usuário logado
        localStorage.setItem(environment.chaveUsuarioLogado, btoa(JSON.stringify(res.usuario)));
        // seta permissões do sistema
        this.authorityService.setPermissoesLocalStorage(JSON.stringify(res.permissoes));
        // redireciona para tela inicial
        window.location.href = 'inicio';
      },
      erro => {
        let mensagem = 'Ocorreu um erro ao tentar realizar o login. Favor contate o suporte.';
        if (erro && erro.error && erro.error.message) {
          mensagem = erro.error.message;
        }
        this.notificacao.erro(mensagem, null, true, null, 5);
      }
    );

    /* let urlAutenticacao = this.helperConfigService.getConfiguracao('PATH', 'AUTH', false);
    
    
    let options: IRequestOptions = new RequestOptions();
    
    options.headers = new HttpHeaders();
    options.headers = options.headers.append("Access-Control-Allow-Origin", "*");
    options.headers = options.headers.append("Access-Control-Allow-Headers", "*");
    options.headers = options.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    options.headers = options.headers.append('Authentication', 'Basic YWNtZTphY21lc2VjcmV0ZQ==');

    options.params = new HttpParams();
    options.params = options.params.append('username', this.username);
    options.params = options.params.append('password', encodeURI(this.password));
    options.params = options.params.append('grant_type', 'password');
    options.params = options.params.append('client_id', 'acme');
    options.params = options.params.append('client_secret', 'acmesecret');
    
    
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', 'Basic c2dwX2lkOlJldGlyZUFsaS1TR1Atc2VjcmV0');

    let uri = `username=${this.username}&password=${encodeURI(this.password)}&grant_type=password&client_id=acme&client_secret=acmesecret`;

    this.httpService.Post<LoginResponse>('https://esb.peixoto.com.br/sgi/oauth/token?' + uri, undefined, {}, true, true ).subscribe(
    res => {
      localStorage.setItem(environment.chaveToken, res.access_token);
      this.userService.setUsuarioLogado(this.tokenService.getUsernameToken());
      this.authorityService.buscarPermissoesSistemaDoUsuario().subscribe(
        res => {
          if (res.status) {
            this.authorityService.setPermissoesLocalStorage(JSON.stringify(res.data));
            window.location.href = 'inicio';
          } else {
            this.notificacao.erro('Erro buscar dados do usuário. Favor contate nosso suporte.', null, true, null, 5 );
          }
        },
        error => {
          this.notificacao.erro('Ocorreu um problema ao buscar suas permissões. Favor faça login novamente.', null, true, null, 5 );
          //colocar pra limpar o localstorage...
          console.log('erro ao buscar permissões => ' + error);
        }
      );


      },
    erro => {
      if (erro && erro.error && erro.error.error == 'invalid_grant') {
        this.notificacao.erro('Usuário e/ou senha incorretos.', null, true, null, 5 );
      } else {
        console.log(erro);
        this.notificacao.erro('Ocorreu um erro ao tentar realizar o login. Favor contate o suporte.', null, true, null, 5 );
      }
      }
    ); */
    
    
    /*
    this.httpService.Post<LoginResponse>('https://esb.peixoto.com.br/' + urlAutenticacao, undefined, options, true, true).subscribe(
    res => {
      localStorage.setItem(environment.chaveToken, res.access_token);
      this.userService.setUsuarioLogado(this.tokenService.getUsernameToken());
      this.authorityService.buscarPermissoesSistemaDoUsuario().subscribe(
        res => {
          if (res.status) {
            this.authorityService.setPermissoesLocalStorage(JSON.stringify(res.data));
            window.location.href = 'inicio';
          } else {
            this.notificacao.erro('Erro buscar dados do usuário. Favor contate nosso suporte.', null, true, null, 5 );
          }
        },
        error => {
          this.notificacao.erro('Ocorreu um problema ao buscar suas permissões. Favor faça login novamente.', null, true, null, 5 );
          console.log(' erro aqui => Ocorreu um problema ao buscar suas permissões. Favor faça login novamente.', error);
        }
      );

    },
    erro => {
      if (erro && erro.error && erro.error.error == 'invalid_grant') {
        this.notificacao.erro('Usuário e/ou senha incorretos.', null, true, null, 5 );
      } else {
        console.log(erro);
        this.notificacao.erro('Ocorreu um erro ao tentar realizar o login. Favor contate o suporte.', null, true, null, 5 );
      }
    }
    );*/
  }

  encodedPassword() {
    return this.password.replace('!', "%21")
      .replace('#','%23').replace('$','%24').replace('&','%26')
      .replace("'",'%27').replace('(','%28').replace(')','%29')
      .replace('*','%2A').replace('+','%2B').replace(',','%2C')
      .replace('/','%2F').replace(':','%3A').replace(';','%3B')
      .replace('=','%3D').replace('?','%3F').replace('@','%40')
      .replace('[','%5B').replace(']','%5D');
  }

}
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { PxtNotificacaoService } from './../services/pxt.notificacao.service';
import { PxtLoadingService } from './../components/pxt-loading/pxt-loading.service';
import { AuthService } from './../../view/auth/services/auth.service';
import { AuthorityService } from '../services/authority.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { LoggedUserService } from '../services/logged.user.service';

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate {
  
  constructor(
    private loggedUserService: LoggedUserService,
    private tokenService: TokenService,
    private authorityService: AuthorityService,
    private notificacao: PxtNotificacaoService,
    private authService: AuthService) { }
    
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        this.authService.isAuthRoute(false);
        if (!this.loggedUserService.isLogged()) {
          this.sair();
          return false;
        }
        let permissoes = this.authorityService.getPermissoesLocalStorage(); // recupera array de permissões do localstorage
        if (!ValidationUtils.isNotUndefinedAndNotNull(permissoes)) { // se não tiver permissões no localstorage
          this.sair();
          return false;
        } else { // caso tenha permissoes no localstorage
          if (next.data.rule == '' || this.authorityService.possuiPermissao(next.data.rule)) {
            // se usuário logado tem permissão na rota atual, prossegue
            return true;
          } else {
            // não tem permissão na rota
            this.notificacao.aviso('Você não tem permissão para acessar a página: ' + next.data.label, undefined, true);
            window.location.href = 'inicio';
            return false;
          }
        }
  }
  
  private sair() {
    // limpa localstorage
    localStorage.clear();
    // redireciona para tela de login
    this.authService.isAuthRoute(true);
    window.location.href = '(auth:login)' ;
  }

    /* canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        this.authService.isAuthRoute(false);
        
        // se possui token, continua
        if (this.tokenService.accessTokenExists()) {
          // se não possui objeto de usuário logado...
          if (!this.loggedUserService.isLogged()) {
            // será buscado no Gestão de Identidade pelo username encontrado dentro do token
            this.userService.setUsuarioLogado(this.tokenService.getUsernameToken());
          }

          let permissoes = this.authorityService.getPermissoesLocalStorage(); // recupera array de permissões do localstorage
          if (permissoes === null || permissoes === undefined) { // se não tiver permissões no localstorage
            // faz requisição no Gestão de Identidade para buscar as permissões do sistema para o username encontrado no token
            this.authorityService.buscarPermissoesSistemaDoUsuario().subscribe(
              res => {
                if (res.status) {
                  this.authorityService.setPermissoesLocalStorage(JSON.stringify(res.data));
                }
                
                //window.location.href = 'dashboard';
                window.location.reload();
                this.loader.stop();
              },
              error => {
                //window.location.href = 'inicio';
                this.loader.stop();
                console.log('Ocorreu um problema ao buscar suas permissões. Favor faça login novamente.', error);
              }
            );
            this.loader.start();
            if (next.data.rule == '') {
              return true;
            }
          } else { // caso tenha permissoes no localstorage
            let menus = [];
            let componentsMenu = this.router.config.filter(route => route.data ? route.data.isMenuItem : false); // recupera todas as rotas criadas no arquivo de rotas
            // iteração para popular array de menus que o usuário logado possui permissão
            for (let index = 0; index < componentsMenu.length; index++) {
              const element = componentsMenu[index];
              if (element.data !== undefined) {
                if (element.data.rule === '') {
                  menus.push(element);
                } else if (this.authorityService.possuiPermissao(element.data.rule)) {
                  menus.push(element);
                }
              }
            }
            this.menuService.update(menus); // atualiza os menus que o usuário logado tem permissão
            // se usuário logado tem permissão na rota atual
            if (next.data.rule == '' || this.authorityService.possuiPermissao(next.data.rule)) {
              return true; // então prossegue
            } else {
              // não tem permissão na rota
              this.notificacao.aviso('Você não tem permissão para acessar a página: ' + next.data.label, undefined, true);
              window.location.href = 'inicio';
              return false;
            }
          }
        } else { // não possui token no localstorage
          // limpa localstorage
          localStorage.clear();
          // redireciona para tela de login
          this.authService.isAuthRoute(true);
          window.location.href = '(auth:login)' ;
          return false;
        }
  } */

}
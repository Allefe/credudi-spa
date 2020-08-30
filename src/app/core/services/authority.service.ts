import { HelperConfigService } from './helper.config.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { TokenService } from './token.service';
import { ValidationUtils } from '../utils/ValidationUtils.util';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor(private httpService: HttpService, private helperConfigService: HelperConfigService, private tokenService: TokenService) {
    
  }

  private getChavePermissoes() {
    return this.helperConfigService.getConfiguracaoApp('CODIGO_SISTEMA', false) + this.helperConfigService.getContextoSistema() + this.tokenService.getUsernameToken();
  }

  /* buscarPermissoesSistemaDoUsuario() {
    const url = this.helperConfigService.getContextoSistema('SGI') + "permissaoUsuario?";
    let params = "sistema=" + this.helperConfigService.getConfiguracaoApp('CODIGO_SISTEMA', false);
    params += "&identificador=" + this.tokenService.getUsernameToken();
    return this.httpService.Get<any>(this.helperConfigService.getUrlBackendProducao() + url + params);
    return this.httpService.Get<any>(this.helperConfigService.getUrlBackendAtual() + url + params);
  } */

  /** CONFIGURAÇÕES LOCALSTORAGE */

  getPermissoesLocalStorage(): string[] {
    try {
      let arrayLocal = localStorage.getItem(this.getChavePermissoes());
      if (arrayLocal == null) {
        return null;
      }
      return JSON.parse(atob(arrayLocal));
    } catch (error) {
      return [];
    }
  }

  setPermissoesLocalStorage(permissoes) {
    localStorage.setItem(this.getChavePermissoes(), btoa(permissoes));
  }

  contemPermissoesLocalStorage(): boolean {
    var permissoes = localStorage.getItem(this.getChavePermissoes());
    return permissoes !== undefined &&
           permissoes !== null &&
           permissoes !== '';
  }

  possuiPermissao(rule: string) : boolean {
    if (!ValidationUtils.isNotUndefinedAndNotNull(rule))
      return false
    if (rule == '')
      return true;
    let rules: string[] = rule.split("|");
    let permissoes: string[] = this.getPermissoesLocalStorage();
    if (ValidationUtils.isNotUndefinedAndNotNull(permissoes)) {
      for (let r of rules) {
        if (permissoes.indexOf(r) > -1) {
          return true;
        }
      }
    }
    return false;
  }
  
}

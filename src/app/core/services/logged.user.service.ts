//import { UsuarioConvenio } from './../models/smc/UsuarioConvenio';
import { UsuarioSeguranca } from './../models/sgi/UsuarioSeguranca.model';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { UsuarioLogado } from './../models/UsuarioLogado';
import { PxtNotificacaoService } from './pxt.notificacao.service';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoggedUserService {

  private _loggedUser: BehaviorSubject<UsuarioSeguranca> = new BehaviorSubject<UsuarioSeguranca>(null);
  public readonly loggedUser: Observable<UsuarioSeguranca> = this._loggedUser.asObservable();

  update(usuarioStorage: UsuarioSeguranca) {
    this._loggedUser.next(usuarioStorage);
  }

  constructor(private notificacao: PxtNotificacaoService, private tokenService: TokenService) {
  }

  getLoggedUser() : UsuarioSeguranca {
    if (!this.isLogged()) {
      return null;
    }
    const usrlgd = localStorage.getItem(environment.chaveUsuarioLogado);
    if (usrlgd !== null) {
      try {
        let usuario: UsuarioSeguranca = new UsuarioSeguranca();
        let usuarioBase64: string = atob(usrlgd);
        usuario = JSON.parse(usuarioBase64);
        return usuario;
      } catch (err) {
        console.log("Erro ao decriptar usuário logado. ", err);
        return null;
      }
    } else {      
      return null;
    }
  }

  isLogged() : boolean {
    try {
      if (!this.tokenService.accessTokenExists()) return false;
      const usrlgd = localStorage.getItem(environment.chaveUsuarioLogado);
      if (!ValidationUtils.isNotUndefinedAndNotNull(usrlgd) && usrlgd.trim() === '') {
        return false;
      }
      let usuarioBase64: string = atob(usrlgd);
      let usuario = <UsuarioSeguranca>JSON.parse(usuarioBase64);
      return (ValidationUtils.isNotUndefinedAndNotNull(usuario)) &&
            (ValidationUtils.isNotUndefinedAndNotNull(usuario.identificador)) &&
            (ValidationUtils.isNotUndefinedAndNotNull(usuario.pessoa) && ValidationUtils.isNotUndefinedAndNotNull(usuario.pessoa.codigo));
    } catch (error) {
      console.log("Erro ao buscar usuário logado no storage. ", error)
      return false;
    }
  }

  /*
  getConveniosAssociados() : UsuarioConvenio[] {
    let base64 = localStorage.getItem(environment.chaveConveniosUsuarioLogado);
    if (ValidationUtils.isNotUndefinedAndNotNull(base64)) {
      try {
        let arrayCodigos = JSON.parse(atob(base64)) as UsuarioConvenio[];
        return arrayCodigos || [];
      } catch (error) {}
    }
    return [];
  }
  */
}
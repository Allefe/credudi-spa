import { PxtNotificacaoService } from './pxt.notificacao.service';
import { LoggedUserService } from './logged.user.service';
import { HelperConfigService } from './helper.config.service';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private notificacao: PxtNotificacaoService, 
        private httpService: HttpService,
        private helperConfigService: HelperConfigService,
        private loggedUserService: LoggedUserService) {

    }

    /**
     * Busca um usuário no Gestão de Identidade a partir do seu identificador.
     * Após receber, será colocado um objeto UsuarioStorage no LocalStorage.
     * @param identificador 
     */
    /* setUsuarioLogado(identificador: string) {
      let url = 'http://esb.peixoto.com.br/' + this.helperConfigService.getContextoSistema('SGI') + 'usuarios/buscarPorIdentificador?identificador=' + identificador;
      this.httpService.Get<any>(url).subscribe(val => {
        if (val.status) {
          let usuario = val.data;
          if (usuario !== null) {
            let usuarioBase64: string = btoa(JSON.stringify(usuario));
            localStorage.setItem(environment.chaveUsuarioLogado, usuarioBase64);
            
            let usuarioStorage: UsuarioStorage = new UsuarioStorage();
            let usuarioJson: string = atob(usuarioBase64);
            usuarioStorage = JSON.parse(usuarioJson);
            this.loggedUserService.update(usuarioStorage);
          }
        } else {
          this.notificacao.aviso('Erro ao buscar usuário por login: ' + (val.errors != null ? val.errors[0] : identificador) + '. Favor contactar suporte.');
        }
      });
    } */

}
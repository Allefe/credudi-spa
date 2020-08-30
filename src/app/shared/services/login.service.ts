/*
import { PxtLoadingService } from './../../core/components/pxt-loading/pxt-loading.service';
import { PxtNotificacaoService } from './../../core/services/pxt.notificacao.service';
import { HelperConfigService } from './../../core/services/helper.config.service';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private path = 'oauth/token';

  constructor(
    private http: Http, 
    private helper: HelperConfigService, 
    private notificacao: PxtNotificacaoService,
    private loader: PxtLoadingService) {
    this.path = this.helper.getUrlBackendAtual() + this.helper.getContextoSistema('SGI') + this.path; 
  }

  doLogin(username: string, password: string) {
    this.loader.start();
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Headers", "*");
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    headers.append('cache-control', 'no-cache');
    headers.append('Authentication', 'Basic YWNtZTphY21lc2VjcmV0ZQ==');
    const requestOptions = new RequestOptions({ headers: headers });
    return this.http.post(
      this.path + '?username=' + username + '&password=' + this.encodedPassword(password)  + '&grant_type=password&client_id=acme&client_secret=acmesecret', 
      null,
      requestOptions).pipe(
        catchError((error) => {
          this.loader.stop();
          this.notificacao.aviso('Senha incorreta');
          return throwError(error);
        }),
        map((res: any) => {
          this.loader.stop();
          return res.json();
        })
      );
  }

  encodedPassword(password) {
    return password.replace('!', "%21")
      .replace('#','%23').replace('$','%24').replace('&','%26')
      .replace("'",'%27').replace('(','%28').replace(')','%29')
      .replace('*','%2A').replace('+','%2B').replace(',','%2C')
      .replace('/','%2F').replace(':','%3A').replace(';','%3B')
      .replace('=','%3D').replace('?','%3F').replace('@','%40')
      .replace('[','%5B').replace(']','%5D');
  }
}*/
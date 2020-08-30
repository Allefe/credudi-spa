import { PxtNotificacaoService } from './pxt.notificacao.service';
import { PxtLoadingService } from './../components/pxt-loading/pxt-loading.service';
import { IRequestOptions } from '../models/IRequestOptions.interface';
import { ConfirmationService } from 'primeng/primeng';
import { HelperConfigService } from './helper.config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PxtHttpError } from '../models/PXtHttpError.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


export function httpServiceCreator(
  httpClient: HttpClient, 
  notificacaoService: PxtNotificacaoService, 
  helperConfigService: HelperConfigService,
  confirmationService: ConfirmationService,
  loadingService: PxtLoadingService) {

    return new HttpService(httpClient, notificacaoService, helperConfigService, confirmationService, loadingService);
}

@Injectable()
export class  HttpService {

  constructor(
    public http: HttpClient,
    public notificacao: PxtNotificacaoService,
    public helperConfigService: HelperConfigService,
    public confirmationService: ConfirmationService,
    public loadingService: PxtLoadingService
    )  {
     
    }

  private buildUrl(endPoint: string) {
    return endPoint.startsWith('http') ? endPoint : this.helperConfigService.getUrlBackendAtual() + endPoint;
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Get<T>(endPoint: string, options?: IRequestOptions, loader?: boolean, removeDefaultHeaders?: boolean, handlerError: boolean = true) {
    return this.handleRequest(this.http.get<T>(this.buildUrl(endPoint), this.buildOptions(options, removeDefaultHeaders)), loader, handlerError);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} body body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(endPoint: string, body: Object, options?: IRequestOptions, loader?: boolean, removeDefaultHeaders?: boolean, handlerError: boolean = true): Observable<T> {
    return this.handleRequest(this.http.post<T>(this.buildUrl(endPoint), body, this.buildOptions(options, removeDefaultHeaders)), loader, handlerError);
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} body body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T>(endPoint: string, body: Object, options?: IRequestOptions, loader?: boolean, removeDefaultHeaders?: boolean, handlerError: boolean = true): Observable<T> {
    return this.handleRequest(this.http.put<T>(this.buildUrl(endPoint), body, this.buildOptions(options, removeDefaultHeaders)), loader, handlerError);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T>(endPoint: string, options?: IRequestOptions, loader?: boolean, removeDefaultHeaders?: boolean, handlerError: boolean = true): Observable<T> {
    return this.handleRequest(this.http.delete<T>(this.buildUrl(endPoint), this.buildOptions(options, removeDefaultHeaders)), loader, handlerError);
  }

  handleRequest<T>(method: Observable<T>, loader?: boolean, handlerError: boolean = true) {
    if (loader) {
      this.loadingService.start();
    }
    return method
      .pipe( 
        tap(
          data => {
            if (loader) {
              this.loadingService.stop();
            }
            data;
          },
          error => {
            this.loadingService.stop();
            if (handlerError) {
              this.onCatchError(error);
            }
            return error;
          }
        )
      )
  }

  buildOptions(options: IRequestOptions, removeDefaultHeaders: boolean) : IRequestOptions {
    return { ...options, headers: removeDefaultHeaders ? options.headers : this.buildDefaultHeaders() }
  }

  buildDefaultHeaders() :HttpHeaders {
    const token = localStorage.getItem(environment.chaveToken);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Cache-Control', 'no-store');
    headers = headers.set('Pragma', 'no-cache');
    headers = headers.set("Cache-Control", "no-cache");
    headers = headers.set("Access-Control-Allow-Origin", "*");
    headers = headers.set("Access-Control-Allow-Credentials", "true");
    headers = headers.set("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
    headers = headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    headers = headers.set("Authorization", "Bearer " + token);

    return headers;
  }

  onCatchError(error: PxtHttpError) {
    let mensagem = error.error;
    try {
      mensagem = error != undefined && error.error != undefined && (<any> error.error).message != undefined ? (<any> error.error).message : error.error;
    } catch (error) {
      mensagem = error.error;
    }
    switch(error.status) {
      case 400:
        this.confirmationService.confirm({ header: "Erro 400 - Bad Request", message: mensagem, icon:"ui-icon-cancel", acceptLabel: "Ok", rejectVisible: false, key: environment.KEY_DIALOG_HTTP_SERVICE });
        break;
      case 401:
        mensagem = 'Sessão expirada. Você será deslogado e redirecionado para realizar um novo login.';
        let logout = () => {
          window.localStorage.clear();
          window.location.href = '(auth:login)';
        };
        this.confirmationService.confirm({ header: "Erro 401 - Unauthorized", message: mensagem, icon:"ui-icon-error-outline", acceptLabel: "Ok", accept: logout, rejectVisible: false, key: environment.KEY_DIALOG_HTTP_SERVICE });
        break;
      case 403:
        this.confirmationService.confirm({ header: "Erro 403 - Forbidden", message: mensagem, icon:"ui-icon-block", acceptLabel: "Ok", rejectVisible: false, key: environment.KEY_DIALOG_HTTP_SERVICE });
        break;
      case 404:
        this.confirmationService.confirm({ header: "Erro 404 - Not Found", message: mensagem, icon:"ui-icon-warning", acceptLabel: "Ok", rejectVisible: false, key: environment.KEY_DIALOG_HTTP_SERVICE });
        break;
      case 500:
        this.confirmationService.confirm({ header: "Erro 500 - Internal Server Error", message: mensagem, icon:"ui-icon-cancel", acceptLabel: "Ok", rejectVisible: false, key: environment.KEY_DIALOG_HTTP_SERVICE });
        break;
      case 502:
        this.confirmationService.confirm({ header: "Erro 500 - Bad Gateway", message: mensagem, icon:"ui-icon-cancel", acceptLabel: "Ok", rejectVisible: false, key: environment.KEY_DIALOG_HTTP_SERVICE });
        break;
      case 503:
        this.confirmationService.confirm({ header: "Erro 500 - Service Unavailable", message: mensagem, icon:"ui-icon-cancel", acceptLabel: "Ok", rejectVisible: false, key: environment.KEY_DIALOG_HTTP_SERVICE });
        break;
      default:
        let message = 'Ocorreu um erro não identificado ao realizar uma ou mais ações. Favor contactar o suporte.';
        this.confirmationService.confirm({ header: "Erro", message: message, icon:"ui-icon-cancel", acceptLabel: "Ok", rejectVisible: false, key: environment.KEY_DIALOG_HTTP_SERVICE });
        break;
    }
  }

}
import { PxtNotificacaoService } from './../services/pxt.notificacao.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from "@angular/common/http";
import { throwError } from 'rxjs';

@Injectable()
export class PxtHttpInterceptor implements HttpInterceptor {

    constructor(public notificacao: PxtNotificacaoService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        /*const token = localStorage.getItem('token');

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

        request = request.clone({ headers: headers });*/

        return next.handle(request)
        .pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError(erro => {
                console.log('Erro ao realizar requisição: ', erro);
                return throwError(erro);
            })
        );
    }

}
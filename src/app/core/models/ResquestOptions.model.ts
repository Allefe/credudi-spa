import { HttpHeaders, HttpParams } from '@angular/common/http';
import { IRequestOptions } from "./IRequestOptions.interface";

export class RequestOptions implements IRequestOptions {
    headers?: HttpHeaders;
    observe?: string = 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: string = 'json';
    withCredentials?: boolean;
    body?: any;

    constructor(params?: HttpParams) {
        this.params = params ? params : new HttpParams();
        this.headers = new HttpHeaders();
    }
}
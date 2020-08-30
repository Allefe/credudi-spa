import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { OAuthToken } from '../models/OAuthToken.model';
import { environment } from 'src/environments/environment';

const KEY_TOKEN = environment.chaveToken;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  getAccessToken() {
    if (this.accessTokenExists()) {
      return localStorage.getItem(KEY_TOKEN);
    } else {
      localStorage.clear();
      return undefined;
    }
  }

  setAccessToken(access_token: string) {
    localStorage.setItem(KEY_TOKEN, access_token);
  }

  removeAccessToken() {
    localStorage.clear();
  }

  accessTokenExists(): boolean {
    return localStorage.getItem(KEY_TOKEN) !== undefined && 
           localStorage.getItem(KEY_TOKEN) !== null &&
           localStorage.getItem(KEY_TOKEN) !== '';
  }

  /**
   * @returns retorna uma instância do objeto OAuthtoken caso o token exista
   * no Local Storage. Caso não exista será retornado null.
   */
  getAccessTokenObject(): OAuthToken {
    if (this.accessTokenExists()) {
      return <OAuthToken>jwt_decode(this.getAccessToken());
    }
    return null;
  }

  getUsernameToken() {
    if (this.accessTokenExists())
      return (<OAuthToken>jwt_decode(this.getAccessToken())).user_name;
  }

}

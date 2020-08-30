import { AuthService } from './../../view/auth/services/auth.service';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private tokenService: TokenService, private authService: AuthService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        this.authService.isAuthRoute(true);
        
        // se possui token, continua
        if (this.tokenService.accessTokenExists()) {
            this.authService.isAuthRoute(false);
            window.location.href = 'inicio';
        } else { // não possui token
            // limpa localstorage
            localStorage.clear();
            return true;
        }
    }

}
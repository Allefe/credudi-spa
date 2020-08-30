import { UsuarioSeguranca } from './core/models/sgi/UsuarioSeguranca.model';
import { ValidationUtils } from 'src/app/core/utils/ValidationUtils.util';
import { UsuarioLogado } from './core/models/UsuarioLogado';
import { LoggedUserService } from './core/services/logged.user.service';
import { HelperConfigService } from './core/services/helper.config.service';
import {AppComponent} from './app.component';
import {Component, OnInit} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="profile" [ngClass]="{'profile-expanded':active}">
            <a href="#" (click)="onClick($event)">
                <!--<img class="profile-image" [src]="loggedUserImage" />-->
                <span class="profile-name">Bem-vindo(a), {{ loggedName }} </span>
                <i class="material-icons">keyboard_arrow_down</i>
            </a>
        </div>

        <ul class="ultima-menu profile-menu" [@menu]="active ? 'visible' : 'hidden'">
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null" (click)="loggout()">
                    <i class="material-icons">power_settings_new</i>
                    <span>Sair</span>
                </a>
            </li>
        </ul>
    `,
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ],
    styles: [`
        .profile-image {
            width: 70px !important;
        }
    `]
})
export class AppInlineProfileComponent implements OnInit {

    active: boolean;

    loggedName : string = 'Colaborador(a)';
    loggedUserImage : string = 'assets/images/logo-39x34.png';

    constructor(public app: AppComponent, 
        private helperConfigService: HelperConfigService,
        private loggedUserService: LoggedUserService) {}

    onClick(event) {
        this.active = !this.active;
        setTimeout(() => {
          this.app.layoutMenuScrollerViewChild.moveBar();
        }, 450);
        event.preventDefault();
    }

    ngOnInit() {
        this.loggedUserService.loggedUser.subscribe((user: UsuarioSeguranca) => {
            if (ValidationUtils.isNotUndefinedAndNotNull(user)) {
                this.loggedName = user.nomeAbreviado;
            } else {
                try {
                    let nomeAbreviado = this.loggedUserService.getLoggedUser().nomeAbreviado;
                    if (ValidationUtils.stringNotEmpty(nomeAbreviado)) {
                        this.loggedName = nomeAbreviado;
                    }
                } catch (err) {}
            }
        });
        
    }

    loggout() {
        localStorage.clear();
        window.location.href = '(auth:login)';
        //window.location.href = this.helperConfigService.getUrlFrontendAutenticacao();
    }
}

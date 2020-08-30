import { AuthorityService } from './../../../core/services/authority.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tenant } from 'src/app/shared/models/Tenant.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthRoute: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isAuthRoute$: Observable<boolean> = this._isAuthRoute.asObservable();
  
  private _currentTenant: BehaviorSubject<Tenant> = new BehaviorSubject<Tenant>(this.getTenant());
  public readonly currentTenant$: Observable<Tenant> = this._currentTenant.asObservable();

  constructor(private authorityService: AuthorityService) {

  }

  isAuthRoute(isAuthRoute: boolean) {
    this._isAuthRoute.next(isAuthRoute);
  }

  isAdministrador() {
    let permissoes: string[] = this.authorityService.getPermissoesLocalStorage();
    return permissoes && permissoes.includes(environment.permissaoAdministrador);
  }

  setTenant(tenant: Tenant) : void {
    localStorage.setItem(environment.keyCurrentTenant, btoa(btoa(JSON.stringify(tenant))));
    this._currentTenant.next(tenant);
  }

  getTenant() : Tenant | null {
    try {
        return JSON.parse(atob(atob(localStorage.getItem(environment.keyCurrentTenant)))) as Tenant;
    } catch (error) {
        return null;
    }
  }

}

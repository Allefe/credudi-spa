import { AuthorityService } from '../services/authority.service';
import { LoggedUserService } from '../services/logged.user.service';
import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[isUserInRule]'
})
export class UserInRuleDirective implements AfterViewInit {

  @Input('isUserInRule') rule: string;

  constructor(public el: ElementRef, public loggedUserService: LoggedUserService, public authorityService: AuthorityService) { }

  ngAfterViewInit() {
    if (this.authorityService)
      this.el.nativeElement.style.display = this.authorityService.possuiPermissao(this.rule) ? '' : 'none';
  }

}

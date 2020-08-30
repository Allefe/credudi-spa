import { HelperConfigService } from './core/services/helper.config.service';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-topbar',
  styles: [`
      .logo-pxt-top {
          font-size: 2.3em;
          margin-top: 10px;
          font-weight: 500;
          font-family: sans-serif;
          color: white;
      }
  `],
  templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
    
  systemsMenuOpen: boolean;

  constructor(
    public app: AppComponent, 
    private helper: HelperConfigService,) {
  }

  logout() {
    localStorage.clear();
    window.location.href = this.helper.getConfiguracao('FRONTEND', 'AUTH', false);
  }

}

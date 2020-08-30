import { InfoBuscaDetalhadaComponent } from './view/consultas/info-busca-detalhada/info-busca-detalhada.component';
import { CadastroUsuarioComponent } from './view/usuario/cadastro-usuario/cadastro-usuario.component';
import { ConsultaUsuarioComponent } from './view/usuario/consulta-usuario/consulta-usuario.component';
import { AssociarPerfilPrivilegiosComponent } from './view/configuracoes-acesso/associar-perfil-privilegios/associar-perfil-privilegios.component';
import { LoginComponent } from './view/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { Guard } from './core/guards/guard';
import { LoginGuard } from './core/guards/login.guard';
import { InicioComponent } from './view/inicio/inicio.component';
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

export const routes: Routes = [
    
    //{ path: 'login', component: LoginComponent, canActivate: [LoginGuard], data: { isMenuItem: false, rule: '', label: 'Login', icon: '' }, outlet: 'auth' },
    
    /*
    { path: '', redirectTo: 'inicio', pathMatch: 'prefix', data: { isMenuItem: false, rule: '', label: 'inicio', icon: 'home' } },
    { path: 'inicio', canActivate: [Guard], component: InicioComponent, data: { rule: "", isMenuItem: true, icon: 'home', label: 'Início'} },

    { path: 'perfil/consulta', canActivate: [Guard], component: ConsultaPerfilComponent, data: { rule: "", isMenuItem: false, icon: 'layers', label: 'Consultar Perfil'} },
    */
   { path: '', redirectTo: 'inicio', pathMatch: 'prefix'},
   { path: 'inicio', component: InicioComponent },
   { path: 'perfilPrivilegio', component: AssociarPerfilPrivilegiosComponent },

   { path: 'usuario/consulta', component: ConsultaUsuarioComponent },
   { path: 'usuario/cadastro', component: CadastroUsuarioComponent },

   { path: 'consultas/BuscaDetalhada', component: InfoBuscaDetalhadaComponent },


];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
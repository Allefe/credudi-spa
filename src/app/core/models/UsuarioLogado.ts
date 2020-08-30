import { UsuarioSeguranca } from './sgi/UsuarioSeguranca.model';
export class UsuarioLogado {
  access_token: string;
	usuario: UsuarioSeguranca;
	permissoes: string[];
}
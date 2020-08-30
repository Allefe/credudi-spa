import { Privilegio } from "./Privilegio.model";
import { Perfil } from "./Perfil.model";

export class PerfilPrivilegio {
    codigo: number;
    codigoPerfil: number;
    codigoPrivilegio: number;
    dataCadastro: Date;
    perfil: Perfil;
    privilegio: Privilegio;
    indListaPrivilegio: boolean;
}
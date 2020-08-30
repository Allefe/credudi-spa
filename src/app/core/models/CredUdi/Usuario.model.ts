import { Perfil } from "./Perfil.model";

export class Usuario {
    
    codigo: number;
    nome: string;
    login: string;
    senha: string;
    dataCadastro: Date;
    status: string;
    codigoPerfil: number;
    perfil: Perfil;
    dataInicioBloqueio: Date;
    dataFimBloqueio: Date;
}
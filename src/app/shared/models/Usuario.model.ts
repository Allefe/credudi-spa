import { Pessoa } from "src/app/core/models/sgi/Pessoa.model";
import { SituacaoUsuario } from "src/app/core/models/sgi/SituacaoUsuario.model";
import { Grupo } from "src/app/core/models/sgi/Grupo.model";

export class Usuario {
    codigo: number;
    identificador: string;
    pessoa: Pessoa;
    grupo: Grupo;
    situacaoUsuario: SituacaoUsuario;
}
import { TelefoneInfoBuscaDetalhada } from './TelefonesInfoBuscaDetalhada.model';
import { EnderecoInfoBuscaDetalhada } from './EnderecosInfoBuscaDetalhada.model';
import { EmailsInfoBuscaDetalhada } from './EmailsInfoBuscaDetalhada.model';
export class CadastralInfoBuscaDetalhada {
    cpf: string;
    nome: string;
    nascimento: Date;
    idade: number;
    sexo: string;
    nomedamae: string;
    codigocbo: number;
    descricaocbo: string;
    escolaridade: string;
    signo: string;
    dependentes: number;
    estadocivil: string;
    renda: number;

}
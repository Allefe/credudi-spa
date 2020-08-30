import { CadastralInfoBuscaDetalhada } from './cadastralInfoBuscaDetalhada.model';
import { TelefoneInfoBuscaDetalhada } from './TelefonesInfoBuscaDetalhada.model';
import { EnderecoInfoBuscaDetalhada } from './EnderecosInfoBuscaDetalhada.model';
import { EmailsInfoBuscaDetalhada } from './EmailsInfoBuscaDetalhada.model';
export class InfoBuscaDetalhada{
    cpf: string;
    nome: string;
    nascimento: Date;
    idade: number;
    sexo: string;
    nomedamae: string;
    signo: string;
    email: EmailsInfoBuscaDetalhada [];
    enderecos: EnderecoInfoBuscaDetalhada [];
    telefones: TelefoneInfoBuscaDetalhada [];
    telefone: TelefoneInfoBuscaDetalhada [];
    cadastral: CadastralInfoBuscaDetalhada;

}
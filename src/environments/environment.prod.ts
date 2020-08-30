import { Ambiente } from '../app/core/models/enumerations/Ambiente.enum';

export const environment = {
  production: true,
  config_file: 'assets/config/env.json',
  KEY_DIALOG_HTTP_SERVICE: 'pxtHttpService',
  ambiente: Ambiente.PRD,
  chaveUsuarioLogado: 'USRLGDSMC',
  permissaoAdministrador: 'SMC_ADM_VSL',
  chaveToken: 'TKNSMC',
  keyCurrentTenant: 'SMCTENANT',
  chaveConveniosUsuarioLogado: 'CNVCLILGD',
  codigoGrupoConveniados: 131
};

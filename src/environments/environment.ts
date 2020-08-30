import { Ambiente } from "src/app/core/models/enumerations/Ambiente.enum";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  config_file: 'assets/config/env.json',
  KEY_DIALOG_HTTP_SERVICE: 'pxtHttpService',
  ambiente: Ambiente.LOCAL,
  chaveToken: 'TKNSMC',
  chaveUsuarioLogado: 'USRLGDSMC',
  permissaoAdministrador: 'SMC_ADM_VSL',
  keyCurrentTenant: 'SMCTENANT',
  chaveConveniosUsuarioLogado: 'CNVCLILGD',
  codigoGrupoConveniados: 131
};

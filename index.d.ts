import { Request, Plugin } from '@hapi/hapi';
import {
  Response as OAuthResponse,

  // Models
  AuthorizationCodeModel,
  ClientCredentialsModel,
  PasswordModel,
  RefreshTokenModel,
  ExtensionModel,
} from '@node-oauth/oauth2-server';


export interface OAuth2ServerPluginOptions {
  model: OAuth2ServerModel;
}

export interface OAuth2ServerModel extends ExtensionModel, AuthorizationCodeModel, ClientCredentialsModel, PasswordModel, RefreshTokenModel {}


export const plugin: Plugin<OAuth2ServerPluginOptions>

export interface OAuth {
  authenticate(request: Request): Promise<OAuthResponse>;
  authorize(request: Request): Promise<OAuthResponse>;
  token(request: Request): Promise<OAuthResponse>;
}

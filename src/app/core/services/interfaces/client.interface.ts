interface IClientAuthConfig {
  authenticated: boolean;
  code: string;
}

interface IClientAuth {
  email: IClientAuthConfig;
}
export interface IClient {
  _id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  auth: IClientAuth;
}

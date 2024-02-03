export interface IAddress {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
}

export interface IRestaurantAuthConfig {
  authenticated: boolean;
  code: string;
}

export interface IRestaurantAuth {
  email: IRestaurantAuthConfig;
}

export interface IRestaurant {
  _id: string;
  email: string;
  name: string;
  password: string;
  cnpj: string;
  phone: string;
  auth: IRestaurantAuth;
  address: IAddress;
  logo: string;
}

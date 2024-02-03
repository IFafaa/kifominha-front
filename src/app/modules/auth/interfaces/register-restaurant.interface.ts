export interface IRegisterRestaurant {
  email: string;
  name: string;
  password: string;
  cnpj: string;
  phone: string;
  address: {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
  };
  logo: string;
}
export interface IRegisterRestaurantResponse {
  id: string;
}

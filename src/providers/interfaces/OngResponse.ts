export interface OngResponse {
  id: number,
  name: string,
  endereco: {
    id: number,
    rua: string,
    cidade: string,
    estado: string,
    cep: string,
    complemento: string,
    numero: string,
  }
}
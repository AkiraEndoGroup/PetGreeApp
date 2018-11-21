export interface UserResponse {
  id: number,
  avatar: {
    id: number,
    name: string,
    imageUrl: string,
    bio: string,
    idade: number
  },
  email: string,
  telefones: [ string ],
  endereco: UserAddress,
  owned: [ number ]
}

export interface UserAddress {
  id: number,
  rua: string,
  cidade: string,
  estado: string,
  cep: string,
  complemento: string,
  numero: string
}

export function UserAvatarJSON(name,bio,idade,image_url){
  this.name = name;
  this.bio = bio;
  this.idade = idade;
  this.imageUrl = image_url;
}

export function UserBuilder() {
  let user: UserResponse = {
    // placeholder
    id: null,
    avatar: {
      id: null,
      bio: null,
      name: null,
      idade: null,
      imageUrl: null
    },
    email: null,
    endereco: null,
    telefones: null,
    owned: null
  }
  return user
}

export function formatAddress(address: UserAddress) {
  let add = ''
  if (address.rua) {
    add = add + address.rua
  }
  if (address.numero) {
    add = add + ', ' + address.numero
  }
  if (address.cidade) {
    add = add + ', ' + address.cidade
  }
  if (address.estado) {
    add = add + ' - ' + address.estado
  }
  if (address.complemento) {
    add = add + '. ' + address.complemento
  }
  if (address.cep) {
    add = add + '. CEP: ' + address.cep
  }
  return add + '.'
}
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
  endereco: {
    id: number,
    rua: string,
    cidade: string,
    estado: string,
    cep: string,
    complemento: string,
    numero: string
  },
  owned: [ number ]
}

export function UserAvatarJSON(name,bio,idade,image_url){
  this.name = name;
  this.bio = bio;
  this.idade = idade;
  this.imageUrl = image_url;
}
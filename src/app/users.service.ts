// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersUrl = 'http://ec2-18-228-44-159.sa-east-1.compute.amazonaws.com:4243/users';
  // usersUrl = 'http://localhost:4243/users'

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth
  ) { }

  getAllUsers() {
    let users: UserResponse[] = []
    return new Promise(resolve => {
      this.http.get(this.usersUrl)
        .subscribe(data => {
          if (data) {
            Array.prototype.forEach.call(data, element => users.push(element))
            resolve(users)
          }
        })
    })
  }

  getCurrentUser() {
    return new Promise(async resolve => {
      await this.afAuth.authState.subscribe(async value => {
        if (value) {
          let email = this.afAuth.auth.currentUser.email;
          let user
          await this.http.get(this.usersUrl + '/email/' + email)
            .subscribe(data => {
              if (data) {
                user = data;
                resolve(user)
              } else {
                resolve(null)
              }
            }, error => {
              console.log(error)
              resolve(null)
            })
        } else {
          resolve(null)
        }
      })
    })

  }

  getUserById(id) {
    let user
    return new Promise(resolve => {
      this.http.get(this.usersUrl + '/' + id)
        .subscribe(data => {
          if (data) {
            user = data
            resolve(user)
          } else {
            resolve(null)
          }
        }, error => {
          console.log(error)
          resolve(null)
        })
    })
  }

  getUserByEmail(email) {
    let user
    return new Promise(resolve => {
      this.http.get(this.usersUrl + '/email/' + email)
        .subscribe(data => {
          if (data) {
            user = data
            resolve(user)
          } else {
            resolve(null)
          }
        }, error => {
          console.log(error)
          resolve(null)
        })
    })
  }

  userExists() {
    return new Promise(resolve => { this.getCurrentUser().then(res => resolve(res != null)) })
  }

  putUser(user: UserResponse) {
    return new Promise(resolve => {
      this.http.put(this.usersUrl + '/' + user.id, user)
        .subscribe(data => {
          resolve(data)
        }, error => {
          console.log(error)
          resolve(null)
        })
    })
  }
}

// Interfaces

export interface UserResponse {
  id?: number,
  avatar?: {
    id?: number,
    name?: string,
    imageUrl?: string,
    bio?: string,
    idade?: number
  },
  email?: string,
  telefones?: [string],
  endereco?: UserAddress,
  owned?: [number]
}

export interface UserAddress {
  id?: number,
  rua?: string,
  cidade?: string,
  estado?: string,
  cep?: string,
  complemento?: string,
  numero?: string
}

export function UserAvatarJSON(name, bio, idade, image_url) {
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
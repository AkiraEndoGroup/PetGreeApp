// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';

// Services
import { UsersService, UserResponse } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  petsUrl = 'http://ec2-18-228-44-159.sa-east-1.compute.amazonaws.com:4242/pets';
  // petsUrl = 'http://localhost:4242/pets'

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    public users: UsersService
  ) { }

  getAllPets() {
    return this.getPetsByFilter(this.toQueryParam({}));
  }

  async getPetsByFilter(filter) {
    let pets: PetResponse[] = []
    let filtersQueryParam = this.toQueryParam(filter)

    return new Promise(resolve => {
      this.http.get(this.petsUrl + filtersQueryParam)
        .subscribe((data) => {
          if (data) {
            Array.prototype.forEach.call(data, element => {
              if (element.size && element.size.description.toLowerCase() == 'muitogrande') {
                element.size.description = "Muito grande"
              }
              pets.push(element)
            })
            resolve(pets)
          }
        }, (error) => {
          console.log(error);
          resolve(null)
        })
    })
  }

  toQueryParam(filter) {
    // Até que eu consiga filtrar melhor os resultados por distância...
    let query = "?limit=15"

    query += filter["status"] ? "&status=" + filter["status"] : ''

    query += filter["radius"] ? "&radius=" + filter["radius"] : ''
    query += filter["lat"] ? "&lat=" + filter["lat"] : ''
    query += filter["lon"] ? "&lon=" + filter["lon"] : ''

    if (filter["lat"] && filter["lon"] && !filter["radius"]) {
      query += "&radius=10"
    }

    query += filter["type"] ? "&type=" + filter["type"] : ''
    query += filter["gender"] ? "&gender=" + filter["gender"] : ''
    query += filter["race"] ? "&raca=" + filter["race"] : ''
    query += filter["size"] ? "&size=" + filter["size"] : ''
    query += filter["fur"] ? "&pelo=" + filter["fur"] : ''
    if (filter["colors"]) {
      filter["colors"].forEach(element => {
        query += "&colors=" + element
      })
    }
    console.log("query: " + query)
    
    return query
  }

  getDistances(location, pets) {
    if (!location)
      return pets
    else {
      pets.forEach((pet) => {
        if (pet.lat && pet.lon) {
          var R = 6371; // Radius of the earth in km
          var dLat = (pet.lat - location.latitude) * Math.PI / 180;
          var dLon = (pet.lon - location.longitude) * Math.PI / 180;
          var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(location.latitude * Math.PI / 180) * Math.cos(pet.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c; // Distance in km
          pet.distanceToMe = Math.round(d * 100) / 100;
        } else {
          pet.distanceToMe = -1
        }
      });
      return pets
    }
  }

  async notificateOwner(petId) {
    this.users.getCurrentUser().then((user: UserResponse) => {
      if (user) {
        console.log(user)
        this.http.post(this.petsUrl + '/' + petId + '/notification', user)
          .subscribe(res => {
            console.log(res)
          })
      }
    })
  }

  async notificateFinder(petId) { }

  async notificateMachucado(petId) { }

  async notificateDesabrigado(petId) { }

  async notificateCruzamento(petId) { }

  async getPetById(id) {
    return new Promise(resolve => {
      this.http.get(this.petsUrl + "/" + id)
        .subscribe((data) => {
          resolve(data)
        }, err => console.log(err))
    }).catch(err => console.log(err))
  }

  async postPet(pet) {
    return new Promise(resolve => {
      this.http.post(this.petsUrl, pet)
        .subscribe((data) => {
          console.log(data)
          resolve(data)
        }, err => console.log(err))
    }).catch(err => console.log(err))
  }

  async putPet(petModel, id) {
    return new Promise(resolve => {
      this.http.put(this.petsUrl + '/' + id, petModel)
        .subscribe((data) => {
          console.log(data)
          resolve(data)
        }, err => console.log(err))
    }).catch(err => console.log(err))
  }

  getPetsEmail(email) { }

  getPetsPerdidos() { }

  getPetsEncontrados() { }

  getPetsEmPerigo() { }

  getPetsSemLar() { }

}

// Interfaces
export interface PetResponse {
  id?: number,
  name?: string,
  type?: { description?: string, id?: number },
  raca?: string,
  pelo?: { description?: string, id?: number }
  gender?: { description?: string, id?: number },
  size?: { description?: string, id?: number },
  colors?: PetColor[],
  status?: { description?: string, id?: number },
  description?: string,
  image_url?: string,
  fotos?: string[],
  owner_id?: number,
  lat?: number,
  lon?: number,
  distanceToMe?: number,
  created_by?: string
}

export interface PetColor {
  id?: number,
  description?: string
}

export function PetJSON(name,type,gender,raca,size,pelo,colors,description,image_url,fotos,status,lat,lon,created_by,owner_id) {
  let json = {
    name: name,
    type: type,
    gender: gender,
    raca: raca,
    size: size,
    pelo: pelo,
    colors: colors,
    description: description,
    image_url: image_url,
    fotos: fotos,
    status: status,
    lat: lat,
    lon: lon,
    created_by: created_by,
    owner_id: owner_id
  }
  return json
}

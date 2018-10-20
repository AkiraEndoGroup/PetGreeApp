import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/auth";
import { PetResponse } from "../interfaces/PetResponse"

@Injectable()
export class PetsProvider {

  // usersUrl ='http://ec2-18-228-44-159.sa-east-1.compute.amazonaws.com:4243/users'; 
  // petsUrl = 'http://ec2-18-228-44-159.sa-east-1.compute.amazonaws.com:4242/pets';
  petsUrl = 'http://localhost:4242/pets'

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth
  ) { }

  getAllPets() {
    let pets: PetResponse[] = []
    return new Promise(resolve => {
      this.http.get(this.petsUrl)
        .subscribe((data) => {
          if (data) {
            Array.prototype.forEach.call(data, element => pets.push(element))
            resolve(pets)
          }
        })
    })
  }

  getPetsByFilter(filter) {
    let pets: PetResponse[] = []
    let filtersQueryParam = this.toQueryParam(filter)

    return new Promise(resolve => {
      this.http.get(this.petsUrl + filtersQueryParam)
        .subscribe((data) => {
          if (data) {
            Array.prototype.forEach.call(data, element => pets.push(element))
            console.log(pets)
            resolve(pets)
          }
        })
    })
  }

  toQueryParam(filter) {
    let query = "?status=" + filter["status"]
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

  getPetsEmail(email) { }

  getPetsPerdidos() { }

  getPetsEncontrados() { }

  getPetsEmPerigo() { }

  getPetsSemLar() { }

}
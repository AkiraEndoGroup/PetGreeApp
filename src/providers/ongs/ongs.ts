import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OngResponse } from "../interfaces/OngResponse"

@Injectable()
export class OngsProvider {

  ongsUrl = 'http://ec2-18-228-44-159.sa-east-1.compute.amazonaws.com:4244/ongs';
  // ongsUrl = 'http://localhost:4244/ongs'

  constructor(
    private http: HttpClient
  ) { }

  getAllOngs() {
    let ongs: OngResponse[] = []
    return new Promise(resolve => {
      this.http.get(this.ongsUrl)
        .subscribe(data => {
          if (data) {
            Array.prototype.forEach.call(data, element => ongs.push(element))
            resolve(ongs)
          }
        })
    })
  }

  getOngByEmail(email) {
    let ong
    return new Promise(resolve => {
      this.http.get(this.ongsUrl + '/email/' + email)
        .subscribe(data => {
          if (data) {
            ong = data;
            resolve(ong)
          }
        })
    })
  }

}
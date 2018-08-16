import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalInsertPet } from '../../modals/modal-insert-pet';
import { ModalController } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ModalShowImage } from '../../modals/modal-show-image';
import { PetResponse, PetJSON } from '../../../providers/interfaces/PetResponse';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'perdidos',
  templateUrl: 'perdidos.html',
  animations: [
    trigger('colorState', [
      state('red', style({
        backgroundColor: "red"
      })),
      state('normal', style({
        backgroundColor: "#7d5dc3"
      })),
      transition('* => *', animate('1000ms ease'))
    ])
  ]
})
export class PagePerdidos implements OnInit {

  // sample (in case no server is available)
  messageList = [];
  // url = 'http://ec2-18-231-183-70.sa-east-1.compute.amazonaws.com:4242/pets';
  url = 'http://localhost:4242/pets';

  myLocation: Coordinates;
  locationFound: boolean;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private geolocation: Geolocation) {

    this.locationFound = false;
    console.log('running geolocation api');
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000
    }).then((resp) => {
      console.log('location found!');
      this.myLocation = resp.coords;
      this.locationFound = true;
    }).catch((error) => {
      console.log('geolocation error. ' + error.message);
    });
  }

  changeColor(message, number) {
    if (number == 1) {
      message.state = 'red';
      this.deletePet(message);
    }
    else {
      message.state = 'normal';
      this.postPet(message);
    }
  }

  ngOnInit() {
    this.getPets();
  }

  getDistanceToMe(lat, lon) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat - this.myLocation.latitude) * Math.PI / 180;
    var dLon = (lon - this.myLocation.longitude) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.myLocation.latitude* Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log('distance: ' + d);
    console.log('distance truncated: ' + Math.round(d));
    return Math.round(d);
  }

  getPets(): void {
    this.messageList = [];
    this.http.get<PetResponse[]>(this.url).subscribe(
      data => {
        console.log(data);
        data.forEach(message => {
          message.state = 'normal';
          message.postString = 'Post';
          if (message.spots)
            message.spotsTxt = "Sim";
          else
            message.spotsTxt = "Não";

          if (message.status.description == 'PERDIDO') {
            message.distanceToMe = this.getDistanceToMe(message.lat,message.lon);
            this.messageList.push(message)
          }
        });

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occurred.");
        } else {
          console.log("Server-side error occurred. Details:\n" + err.message);
        }
      });
  }

  showImage(image) {
    let modal = this.modalCtrl.create(ModalShowImage, { image: image });
    modal.present();
  }

  insertPet(): void {
    let modal = this.modalCtrl.create(ModalInsertPet, { location: this.myLocation });

    modal.onDidDismiss(data => {
      if (data) {
        let pet = { name: "string", type: "string", color: "string", gender: "string", size: "string", spots: false, description: "string", image_url: null, lat: 0, lon: 0 }
        switch (parseInt(data.gender, 10)) {
          case 0: {
            pet.gender = "Macho"; break;
          }
          case 1: {
            pet.gender = "Femea"; break;
          }
          case 2: {
            pet.gender = "Desconhecido"; break;
          }
        }
        switch (parseInt(data.type, 10)) {
          case 1: {
            pet.type = "Cachorro"; break;
          }
          case 2: {
            pet.type = "Gato"; break;
          }
          case 3: {
            pet.type = "Hamster"; break;
          }
          case 4: {
            pet.type = "Coelho"; break;
          }
          case 5: {
            pet.type = "Cavalo"; break;
          }
          case 6: {
            pet.type = "Lagarto"; break;
          }
          case 7: {
            pet.type = "Pássaro"; break;
          }
          case 8: {
            pet.type = "Tartaruga"; break;
          }
          default: {
            pet.type = "Outro"; break;
          }
        }
        switch (parseInt(data.size, 10)) {
          case 0: {
            pet.size = "Pequenino"; break;
          }
          case 1: {
            pet.size = "Pequeno"; break;
          }
          case 2: {
            pet.size = "Medio"; break;
          }
          case 3: {
            pet.size = "Grande"; break;
          }
          case 4: {
            pet.size = "Muitogrande"; break;
          }
          case 5: {
            pet.size = "Imenso"; break;
          }
          default: {
            pet.size = "Outro"; break;
          }
        }
        switch (parseInt(data.color, 10)) {
          case 0: {
            pet.color = "Branco"; break;
          }
          case 1: {
            pet.color = "Preto"; break;
          }
          case 2: {
            pet.color = "Marrom"; break;
          }
          case 3: {
            pet.color = "Laranja"; break;
          }
          case 4: {
            pet.color = "Malhado"; break;
          }
          case 5: {
            pet.color = "Bege"; break;
          }
          default: {
            pet.color = "Outro"; break;
          }
        }
        pet.name = data.name;
        pet.spots = data.spots;
        pet.description = data.description;
        pet.image_url = data.image_url;
        pet.lat = data.lat;
        pet.lon = data.lon;
        this.postPet(pet);
      }
    });

    modal.present();
  }

  postPet(pet): void {
    let petVO = new PetJSON(
      pet.name,
      pet.type,
      pet.gender,
      pet.size,
      pet.color,
      pet.spots,
      pet.description,
      pet.image_url,
      'PERDIDO',
      null,
      pet.lat,
      pet.lon
    );

    this.http.post(this.url, petVO).subscribe(
      data => {
        console.log("POSTADOOO");
        console.log(data);
        this.getPets();
      }
    )
  }

  deletePet(pet): void {
    console.log('DELETE' + this.url + '/' + pet.id);
    this.http.delete(this.url + '/' + pet.id).subscribe(
      data => {
        console.log(data);
        pet.postString = 'Repost';
      }
    )
  }
}
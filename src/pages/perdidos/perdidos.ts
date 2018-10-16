import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalInsertPet } from '../../modals/modal-insert-pet'
import { ModalController, Content, NavParams, AlertController } from 'ionic-angular';
import { ModalShowImage } from '../../modals/modal-show-image';
import { PetResponse, PetJSON } from '../../providers/interfaces/PetResponse';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'perdidos',
  templateUrl: 'perdidos.html'
})
export class PagePerdidos implements OnInit {
  @ViewChild(Content) content: Content;
  // sample (in case no server is available)
  messageList = Array<PetResponse>();
  // url = 'https://localhost:4242/pets';
  petsUrl = 'http://ec2-18-228-44-159.sa-east-1.compute.amazonaws.com:4242/pets';
  ongsUrl = 'http://ec2-18-228-44-159.sa-east-1.compute.amazonaws.com:4244/ongs';

  myLocation: Coordinates;
  finishedLoading: boolean;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private fire: FirebaseProvider) {
    this.myLocation = this.navParams.get('location');
  }

  ngOnInit() {
    this.finishedLoading = false;
    this.getPets();
  }

  update() {
    this.content.resize();
  }

  async getPets() {
    this.messageList = [];
    await this.http.get<PetResponse[]>(this.petsUrl, { withCredentials: false }).toPromise().then(
      data => {
        data.forEach(async (value) => {
          if (value.status.description == 'PERDIDO') {
            value.postString = 'Post';
            if (value.spots)
              value.spotsTxt = "Sim";
            else
              value.spotsTxt = "Não";

            if (this.myLocation != null) {
              var R = 6371; // Radius of the earth in km
              var dLat = (value.lat - this.myLocation.latitude) * Math.PI / 180;
              var dLon = (value.lon - this.myLocation.longitude) * Math.PI / 180;
              var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.myLocation.latitude * Math.PI / 180) * Math.cos(value.lat * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = R * c; // Distance in km
              value.distanceToMe = Math.round(d * 100) / 100;
            }

            this.messageList.push(value);
          }
        });
        this.messageList.sort(this.sortByDistance);
        this.finishedLoading = true;
        this.update();
      }).catch(
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occurred.");
          } else {
            console.log("Server-side error occurred. Details:\n" + err.message);
          }
        });
  }

  sortByDistance(a: PetResponse, b: PetResponse) {
    return (a.distanceToMe - b.distanceToMe);
  }

  showImage(image) {
    let modal = this.modalCtrl.create(ModalShowImage, { image: image });
    modal.present();
  }

  insertPet(): void {
    if (this.fire.authenticated) {

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
      pet.lon,
      this.fire.auth.auth.currentUser.email
    );

    this.http.post(this.petsUrl, petVO).subscribe(
      data => {
        this.getPets();
      }
    )
  }

  deletePet(pet): void {
    // TODO: Verificar se o cara pode deletar essa parada (tem que ser ong, ou a pessoa que cadastrou)
    if (this.fire.authenticated) {
      this.isOng(this.fire.auth.auth.currentUser.email, (result) => {
        if (result) {
          this.http.delete(this.petsUrl + '/' + pet.id).subscribe(
            data => {
              pet.postString = 'Repost';
            }
          );
        }
      });
    } else {
      let alert = this.alertCtrl.create({
        title: "Erro",
        message: "É preciso estar logado!",
        buttons: ['Ah, entendi.']
      });
      alert.present();
    }
  }

  isOng(email, callback) {
    this.http.get(this.ongsUrl + '/email/' + email).subscribe(
      data => {
        console.log(data);
        callback(true);
      }, err => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: "Erro",
          subTitle: err.error.message,
          message: "É preciso ser uma ONG para cadastrar pets para adoção.",
          buttons: ['OK']
        });
        alert.present();
        callback(false);
      }
    );
  }
}
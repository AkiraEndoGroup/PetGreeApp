import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PetResponse, PetJSON } from '../../providers/interfaces/PetResponse';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { EmailComposer } from '@ionic-native/email-composer';
import { ModalInsertPet } from '../modals/modal-insert-pet';
import { ModalShowImage } from '../modals/modal-show-image';
import { OngResponse } from '../../providers/interfaces/OngResponse';

@IonicPage()
@Component({
  selector: 'page-adocao',
  templateUrl: 'adocao.html',
})
export class AdocaoPage implements OnInit {

  petsUrl = 'http://localhost:4242/pets';
  ongsUrl = 'http://localhost:4244/ongs';

  petsList = [];
  ongsList = [];
  ongName;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fire: FirebaseProvider,
    public http: HttpClient,
    public composer: EmailComposer,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.getOngs();
    this.getPets();
  }

  makeOng() {
    if (this.composer.isAvailable) {
      if (this.composer.hasPermission) {
        let userEmail = this.fire.auth.auth.currentUser.email;
        let email = {
          from: userEmail,
          to: 'yago.dorea@gmail.com',
          subject: 'Cadastro de ONG',
          cc: [],
          bcc: [],
          body: 'Olá! Quero cadastrar minha ONG com o email ' + userEmail + '.',
          isHtml: false,
          app: 'gmail'
        }
        this.composer.open(email);

        let alert = this.alertCtrl.create({
          title: "Pronto",
          subTitle: "Solicitação enviada!",
          message: "Vamos analisar se seu cadastro pode se tornar uma ONG. :)",
          buttons: ['OK']
        });
        alert.present();
      } else {
        this.composer.requestPermission();
      }
    } else {
      let ruim = this.alertCtrl.create({
        title: "Deu ruim!",
        message: "Não é possível enviar email nesse dispositivo!",
        buttons: ['OK']
      });
      ruim.present();
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
    )
  }

  showImage(image) {
    let modal = this.modalCtrl.create(ModalShowImage, { image: image });
    modal.present();
  }

  getPets(): void {
    this.petsList = [];
    this.http.get<PetResponse[]>(this.petsUrl).subscribe(
      data => {
        console.log(data);
        data.forEach(pet => {
          pet.state = 'normal';
          pet.postString = 'Post';
          if (pet.spots)
            pet.spotsTxt = "Sim";
          else
            pet.spotsTxt = "Não";

          if (pet.ong_email)
            pet.ong_name = this.getOngName(pet.ong_email);

          console.log(pet.ong_name);

          if (pet.status.description == 'DISPONIVEL') {
            this.petsList.push(pet)
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

  getOngs(): void {
    this.ongsList = [];
    this.http.get<OngResponse[]>(this.ongsUrl).subscribe(
      data => {
        console.log(data);
        data.forEach(ong => {
          this.ongsList.push(ong)
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

  getOngName(email): string {
    let ongName: string;
    this.ongsList.forEach(ong => {
      if (ong.email == email) {
        ongName = ong.name;
      }
    });
    return ongName;
  }

  insertPet() {
    this.isOng(this.fire.auth.auth.currentUser.email, result => {
      if (result) {
        console.log('okay');
        this.insertAPet();
      } else {
        console.log('nope');
      }
    });
  }

  insertAPet(): void {
    let modal = this.modalCtrl.create(ModalInsertPet);

    modal.onDidDismiss(data => {
      if (data) {
        let pet = { name: "string", type: "string", color: "string", gender: "string", size: "string", spots: false, description: "string", image_url: null,lat:null,lon:null }
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
      'DISPONIVEL',
      this.fire.auth.auth.currentUser.email,
      pet.lat,
      pet.lon
    );

    this.http.post(this.petsUrl, petVO).subscribe(
      data => {
        console.log("POSTADOOO -> " + data);
        this.getPets();
      }
    )
  }
}

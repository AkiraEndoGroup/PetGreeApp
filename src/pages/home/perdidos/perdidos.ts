import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalInsertPet } from '../../modals/modal-insert-pet';
import { ModalController } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ModalShowImage } from '../../modals/modal-show-image';
import { PetResponse } from '../../../providers/interfaces/PetResponse';

function PetJSON(name,type,gender,size,color,spots,description,image_url) {
  this.name = name;
  this.type = type;
  this.gender = gender;
  this.size = size;
  this.color = color;
  this.spots = spots;
  this.description = description;
  this.image_url = image_url;
}

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

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController) { }

  changeColor(message,number) {
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

          if (message.image_url == null)
            message.image_url = "./assets/imgs/pet1.png";

          if (message.status.description == 'PERDIDO') {
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
    let modal = this.modalCtrl.create(ModalShowImage, {image: image});
    modal.present();
  }

  insertPet(): void {
    let modal = this.modalCtrl.create(ModalInsertPet);
  
    modal.onDidDismiss(data => {
      if (data) {
        let pet = { name: "string", type:"string", color:"string", gender:"string", size:"string", spots:false, description:"string", image_url:null }
        switch(parseInt(data.gender,10)) {
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
        switch(parseInt(data.type,10)) {
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
        switch(parseInt(data.size,10)) {
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
        switch(parseInt(data.color,10)) {
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
        // TODO fazer o fetch do link de upload
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
      pet.image_url
    );

    console.log("POST:"+this.url+" -d'{name: "+petVO.name+",type:" + petVO.type + ",gender:" + petVO.gender + ",size:" + petVO.size + ",color:" + petVO.color + ",spots:" + petVO.spots + ",description:" + petVO.description + ",image_url:" + petVO.image_url + "\n")
    this.http.post(this.url,petVO).subscribe(
      data => {
        console.log("POSTADOOO -> " + data);
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
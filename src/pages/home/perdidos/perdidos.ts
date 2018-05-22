import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalInsertPet } from './modal-insert-pet';
import { ModalController } from 'ionic-angular';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

interface PetResponse {
    id: number,
    type: { description: string },
    gender: { description: string },
    size: { description: string },
    color: { description: string },
    spots: boolean,
    description: string,
    state: string,
    postString: string
}

@Component({
  selector: 'perdidos',
  templateUrl: 'perdidos.html',
  animations: [
    trigger('colorState', [
      state('red', style({
        backgroundColor: "red"
      })),
      state('yellow', style({
        backgroundColor: "yellow"
      })),
      transition('* => *', animate('1000ms ease'))
    ])
  ]
})
export class PagePerdidos implements OnInit {

    // sample (in case no server is available)
    messageList = [
        {type:{description:"SampleAnimal"},gender:{description:"SampleGender"},size:{description:"Grande"},color:{description:"Branco"},spots:true, description:"Sample Description.",state:"yellow",postString:"Post"},
        {type:{description:"SampleAnimal"},gender:{description:"SampleGender"},size:{description:"Grande"},color:{description:"Branco"},spots:true, description:"Sample Description.",state:"yellow",postString:"Post"},
        {type:{description:"SampleAnimal"},gender:{description:"SampleGender"},size:{description:"Grande"},color:{description:"Branco"},spots:true, description:"Sample Description.",state:"yellow",postString:"Post"},
        {type:{description:"SampleAnimal"},gender:{description:"SampleGender"},size:{description:"Grande"},color:{description:"Branco"},spots:true, description:"Sample Description.",state:"yellow",postString:"Post"},
        {type:{description:"SampleAnimal"},gender:{description:"SampleGender"},size:{description:"Grande"},color:{description:"Branco"},spots:true, description:"Sample Description.",state:"yellow",postString:"Post"},
    ];
    url = 'http://localhost:4242/pets';

    constructor(
        private http: HttpClient,
        private modalCtrl: ModalController) {
    }

    changeColor(message,number) {
        if (number == 1) {
            message.state = 'red';
            this.deletePet(message);
        }
        else {
            message.state = 'yellow';
            this.postPet(message);
        }
    }

    ngOnInit() {
    this.getPets();
    }

  getPets(): void {
    this.http.get<PetResponse[]>(this.url).subscribe(
      data => {
        console.log(data);
        this.messageList = data;
        this.messageList.forEach(message => {
            message.state = 'yellow';
            message.postString = 'Post';
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

  insertPet(): void {
    let modal = this.modalCtrl.create(ModalInsertPet);
  
    modal.onDidDismiss(data => {
        if (data) {
            this.postPet(data);
        }
    });

    modal.present();
  }

  postPet(pet): void {
    let petVO = {
      type: pet.type.description,
      gender: pet.gender.description,
      size: pet.size.description,
      color: pet.color.description,
      spots: pet.spots,
      description: pet.description
    }
    this.http.post(this.url,petVO).subscribe(
      data => {
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
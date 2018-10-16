import { OnInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { PetResponse } from '../../providers/interfaces/PetResponse';
import { ModalShowImage } from '../../modals/modal-show-image'

@Component({
  selector: 'meuspets',
  templateUrl: 'meuspets.html'
})
export class PageMeusPets implements OnInit {

  usersUrl ='http://ec2-18-228-44-159.sa-east-1.compute.amazonaws.com:4243/users'; 
  petsUrl = 'http://ec2-18-228-44-159.sa-east-1.compute.amazonaws.com:4242/pets';
  myPets = [];

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private fire: FirebaseProvider
  ) {}

  ngOnInit() {
    this.getMyPets();
  }  

  showImage(image) {
    let modal = this.modalCtrl.create(ModalShowImage, {image: image});
    modal.present();
  }

  getMyPets() {
    this.http.get(this.usersUrl + '/email/' + this.fire.auth.auth.currentUser.email)
    .subscribe((data => {
      if (data){
        data['owned'].forEach(element => {
          this.http.get<PetResponse>(this.petsUrl + '/' + element)
          .subscribe((pet) => {
            if(pet.spots)
              pet.spotsTxt = "Sim";
            else 
              pet.spotsTxt = "Não";
            this.myPets.push(pet);
          })
        });
      }
    }))
  }
}
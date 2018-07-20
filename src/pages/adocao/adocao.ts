import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-adocao',
  templateUrl: 'adocao.html',
})
export class AdocaoPage {

  title = 'Adoção';
  
  items = new Array<string>();
  keys = new Array<string>();
  newItem = '';
  imgURL = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireProvider: FirebaseProvider) {

    this.fireProvider.getURL().subscribe(data => {
      this.items.push(data);
      console.log(data);
      this.imgURL = data;
    })
  }

  addItem(){
    let pet = {
      type: 'Cachorro',
      gender: 'Macho',
      size: 'medio',
      color: 'preto',
      spots: false,
      description: 'Muito bonito.'
    }

    this.fireProvider.addItem(pet);
  }

  removeItem(elem) {
    this.fireProvider.removeItem(elem);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, map } from '@firebase/util';

import { PetResponse } from '../home/perdidos/perdidos'
/**
 * Generated class for the AdocaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

    // fireProvider.getItems().valueChanges().subscribe(data => {
    //   console.log(data);
    //   data.forEach(element => {
    //     console.log(element);
    //     for(var key in element) {
    //       this.items.push(element[key]);
    //       this.keys.push(key);
    //     }
    //     console.log('items:\n' + this.items);
    //     console.log('keys:\n' + this.keys);
    //   });
    // });

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

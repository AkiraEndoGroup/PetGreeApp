import { Component, ViewChild } from '@angular/core';
import { PetsProvider } from '../../providers/pets/pets';
import { Slides, NavController, MenuController, Loading, LoadingController, AlertController } from 'ionic-angular';
// import { UsersProvider } from '../../providers/users/users';
import { FunctionsPage } from '../functions/functions';
import { PerfilPetPage } from '../perfil-pet/perfil-pet';
import { Geolocation } from '@ionic-native/geolocation';
import { PetResponse } from '../../providers/interfaces/PetResponse';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'newHome.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides

  slidesList: Object[] = [
    {
      // placeholder
      name: "",
      image_url: "",
      status: { description: "OK", id: 0 }
    }
  ]

  hasLocation: boolean = false
  location: any
  loading: Loading

  constructor(
    private pets: PetsProvider,
    // private users: UsersProvider,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public geo: Geolocation,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.pets.getAllPets().then((res: PetResponse[]) => {
      this.slidesList = Array.from(res)
      this.getDistances()
    })

    this.loading = loadingCtrl.create({
      content: "Determinando localização",
      spinner: 'dots'
    })

    console.log('running geolocation api');
    this.geo.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000
    }).then((resp) => {
      console.log('location found!');
      this.location = resp.coords;
      this.hasLocation = true;
      this.loading.dismiss();
    }).catch((error) => {
      this.loading.dismiss();
      let alert = alertCtrl.create({
        title: 'Erro de localização',
        message: 'Não foi possível determinar sua localização.',
        buttons: ['OK :/']
      });
      alert.present();
      console.log('geolocation error. ' + error.message);
    });
  }

  getDistances() {
    if (this.hasLocation) {
      this.slidesList.forEach((pet: PetResponse) => {
        if (pet.lat && pet.lon) {
          if (this.location != null) {
            var R = 6371; // Radius of the earth in km
            var dLat = (pet.lat - this.location.latitude) * Math.PI / 180;
            var dLon = (pet.lon - this.location.longitude) * Math.PI / 180;
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.location.latitude * Math.PI / 180) * Math.cos(pet.lat * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            pet.distanceToMe = Math.round(d * 100) / 100;
          }
        }
      });
    }
  }

  ionViewDidEnter() {
    this.slides.autoplayDisableOnInteraction = false;
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(true)
    this.slides.update()
    this.slides.startAutoplay()
  }

  ionViewWillLeave() {
    this.menuCtrl.swipeEnable(false)
  }

  goToPet() {
    this.slides.stopAutoplay()
    let index = this.slides.realIndex
    let pet = this.slidesList[index]
    this.navCtrl.push(PerfilPetPage, {
      pet: pet
    })
  }

  more() {
    this.slides.stopAutoplay()
    this.navCtrl.push(FunctionsPage)
  }

  search(status) {
    this.navCtrl.push(SearchPage,{filter: status})
  }
}

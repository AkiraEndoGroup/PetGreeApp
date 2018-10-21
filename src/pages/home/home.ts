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
  templateUrl: 'home.html'
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
      console.log(this.slidesList)

      this.loading = loadingCtrl.create({
        content: "Determinando localização",
        spinner: 'dots'
      })

      console.log('running geolocation api');
      if (!this.hasLocation) {
        this.geo.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 5000
        }).then((resp) => {
          console.log('location found!');
          this.location = resp.coords;
          this.hasLocation = true;

          this.slidesList = pets.getDistances(this.location, this.slidesList)
          this.slidesList = pets.orderByDistanceToMe(this.slidesList)
          console.log(this.slidesList)

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
    })
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
    this.slides.stopAutoplay()
    this.menuCtrl.swipeEnable(false)
  }

  goToPet() {
    let index = this.slides.realIndex
    let pet = this.slidesList[index]
    this.navCtrl.push(PerfilPetPage, {
      pet: pet
    })
  }

  more() {
    this.navCtrl.push(FunctionsPage)
  }

  search(status) {
    this.navCtrl.push(SearchPage, {
      filter: status,
      location: this.location
    })
  }
}

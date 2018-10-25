import { Component, ViewChild } from '@angular/core';
import { PetsProvider } from '../../providers/pets/pets';
import { Slides, NavController, MenuController, Loading, LoadingController, AlertController } from 'ionic-angular';
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
      name: "Indisponível",
      image_url: "assets/imgs/not-found.png"
    }
  ]

  hasLocation: boolean = false
  location: any
  loading: Loading

  constructor(
    private pets: PetsProvider,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public geo: Geolocation,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidEnter() {
    this.slides.autoplayDisableOnInteraction = false;
  }

  ionViewDidLoad() {
    this.reload()
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(true)
    this.slides.update()
    this.slides.startAutoplay()
  }

  reload() {
    if (this.hasLocation) {
      this.pets.getPetsByFilter({
        lat: this.location.latitude,
        lon: this.location.longitude
      }).then((res: PetResponse[]) => this.slidesList = this.pets.getDistances(this.location, Array.from(res)))
        .catch(err => console.log(err))

    } else {
      this.loading = this.loadingCtrl.create({
        content: "Determinando localização",
        spinner: 'dots'
      })
      this.loading.present()
      console.log('running geolocation api');
      this.geo.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000
      }).then((resp) => {
        console.log('location found!');
        this.location = resp.coords;
        this.hasLocation = true;

        this.pets.getPetsByFilter({
          lat: this.location.latitude,
          lon: this.location.longitude
        }).then((res: PetResponse[]) => this.slidesList = this.pets.getDistances(this.location, Array.from(res)))
          .catch(err => console.log(err))

        this.loading.dismiss()
      }).catch((error) => {
        console.log('geolocation error. ' + error.message)
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Erro de localização',
          message: 'Não foi possível determinar sua localização.',
          buttons: ['OK :/']
        });
        alert.present();

        this.pets.getPetsByFilter({}).then((res: PetResponse[]) => this.slidesList = this.pets.getDistances(this.location, Array.from(res)))
          .catch(err => console.log(err))
      })
    }
  }

  ionViewWillLeave() {
    this.slides.stopAutoplay()
    this.menuCtrl.swipeEnable(false)
  }

  goToPet() {
    let index = this.slides.realIndex
    let pet = this.slidesList[index]
    if (pet["name"] != "Indisponível") {
      this.navCtrl.push(PerfilPetPage, {
        pet: pet
      })
    }
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

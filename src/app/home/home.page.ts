import { Component, ViewChild, OnInit } from '@angular/core';
import { PetsService, PetResponse } from '../pets.service';
import { Slides, LoadingController, MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ParamsService } from '../params.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
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
  loading: any

  constructor(
    private pets: PetsService,
    public menuCtrl: MenuController,
    public router: Router,
    public params: ParamsService,
    public geo: Geolocation,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public afAuth: AngularFireAuth
  ) {
  }

  ngAfterViewInit() {
    this.slides.startAutoplay()
  }

  ngOnDestroy() {
    this.slides.stopAutoplay()
  }

  ngOnInit() {
    this.location = this.params.locationData
    this.afAuth.authState.subscribe(value => {
      if (value) {
        this.reload()
      } else {
        this.router.navigate(['/splash'])
      }
    })
  }

  // ionViewWillEnter() {
  //   this.menuCtrl.swipeEnable(true)
  //   this.slides.update()
  //   this.slides.startAutoplay()
  // }

  async reload() {
    if (this.hasLocation) {
      this.pets.getPetsByFilter({
        lat: this.location.latitude,
        lon: this.location.longitude
      }).then((res: PetResponse[]) => this.slidesList = this.pets.getDistances(this.location, Array.from(res)))
        .catch(err => console.log(err))

    } else {
      this.loading = await this.loadingCtrl.create({
        message: "Determinando localização",
        spinner: 'dots'
      })
      await this.loading.present()
      console.log('running geolocation api');
      this.geo.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000
      }).then(async (resp) => {
        console.log('location found!');
        this.location = resp.coords;
        this.params.locationData = resp.coords
        this.hasLocation = true;

        this.pets.getPetsByFilter({
          lat: this.location.latitude,
          lon: this.location.longitude
        }).then((res: PetResponse[]) => this.slidesList = this.pets.getDistances(this.location, Array.from(res)))
          .catch(err => console.log(err))

        await this.loading.dismiss()
      }, async err => {
        console.log('geolocation error. ' + err.message)
        this.loading.dismiss();
        let alert = await this.alertCtrl.create({
          header: 'Erro de localização',
          message: 'Não foi possível determinar sua localização.',
          buttons: ['OK :/']
        });
        alert.present();
        this.getWithoutFilter()
      })
        .catch(async (error) => {
          console.log('geolocation error. ' + error.message)
          await this.loading.dismiss();
          let alert = await this.alertCtrl.create({
            header: 'Erro de localização',
            message: 'Não foi possível determinar sua localização.',
            buttons: ['OK :/']
          });
          await alert.present();
          this.getWithoutFilter()
        })
    }
  }

  getWithoutFilter() {
    this.pets.getPetsByFilter({}).then((res: PetResponse[]) => {
      this.slidesList = this.pets.getDistances(this.location, Array.from(res))
    }, err => console.log(err))
      .catch(err => console.log(err))
  }

  ngViewWillLeave() {
    this.slides.stopAutoplay()
    this.menuCtrl.swipeEnable(false)
  }

  async goToPet() {
    let index
    await this.slides.getActiveIndex().then(value => index = value)
    let pet: any = this.slidesList[index]
    if (pet.name != "Indisponível") {
      this.router.navigate(['/perfil-pet', pet.id])
    }
  }

  more() {
    this.router.navigate(['/functions'])
  }

  search(status) {
    this.params.statusData = status
    this.params.locationData = location
    this.router.navigate(['/search'])
  }

}

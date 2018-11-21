import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { SearchPage } from "../search/search";
import { PetsProvider } from "../../providers/pets/pets";
import { ResultadosPage } from "../resultados/resultados";
import { PetResponse } from "../../providers/interfaces/PetResponse";

@Component({
  selector: 'page-functions',
  templateUrl: 'functions.html'
})
export class FunctionsPage {

  location

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public pets: PetsProvider
  ) { 
    this.location = this.navParams.get('location')
  }

  searchPerdidos() {
    this.navCtrl.push(SearchPage, {
      filter: 'PERDIDO',
      location: this.location
    })
  }

  searchEncontrados() {
    this.navCtrl.push(SearchPage, {
      filter: 'ENCONTRADO',
      location: this.location
    })
  }

  cadastrarMachucado() {
    this.notImplemented()
  }

  searchMachucado() {
    let filter = { status: 'MACHUCADO' }
    this.pets.getPetsByFilter(filter).then((res: PetResponse[]) => {
      this.goToResults(res, filter)
    }).catch(err => console.log(err))
  }

  cadastrarPrecisaAbrigo() {
    this.notImplemented()
  }

  searchPrecisaAbrigo() {
    let filter = { status: 'DESABRIGADO' }
    this.pets.getPetsByFilter(filter).then((res: PetResponse[]) => {
      this.goToResults(res, filter)
    }).catch(err => console.log(err))
  }

  searchQuerCruzar() {
    this.navCtrl.push(SearchPage, {
      filter: 'QUER_CRUZAR',
      location: this.location
    })
  }

  goShop() {
    this.notImplemented()
  }

  async notImplemented() {
    let alert = await this.alertCtrl.create({
      message: "Ainda indisponível!",
      buttons: ["OK"]
    })
    await alert.present()
  }

  goToResults(results, filter) {
    this.navCtrl.push(ResultadosPage, {
      results: results,
      location: this.location,
      filter: filter
    })
  }

  return() {
    this.navCtrl.pop()
  }
}
import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { SearchPage } from "../search/search";

@Component({
  selector: 'page-functions',
  templateUrl: 'functions.html'
})
export class FunctionsPage {

  location

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) { 
    this.location = this.navParams.get('location')
  }

  searchPerdidos() {
    this.navCtrl.push(SearchPage, {
      filter: 'perdido',
      location: this.location
    })
  }

  searchEncontrados() {
    this.navCtrl.push(SearchPage, {
      filter: 'encontrado',
      location: this.location
    })
  }

  cadastrarMachucado() {
    this.notImplemented()
  }

  searchMachucado() {
    this.navCtrl.push(SearchPage, {
      filter: 'machucado',
      location: this.location
    })
  }

  cadastrarPrecisaAbrigo() {
    this.notImplemented()
  }

  searchPrecisaAbrigo() {
    this.navCtrl.push(SearchPage, {
      filter: 'desabrigado',
      location: this.location
    })
  }

  searchQuerCruzar() {
    this.navCtrl.push(SearchPage, {
      filter: 'quer_cruzar',
      location: this.location
    })
  }

  goShop() {
    this.notImplemented()
  }

  notImplemented() {
    let alert = this.alertCtrl.create({
      message: "Ainda indisponível!",
      buttons: ["OK"]
    })
    alert.present()
  }

  return() {
    this.navCtrl.pop()
  }
}
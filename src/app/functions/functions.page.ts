import { Component, OnInit } from '@angular/core';
import { PetsService, PetResponse } from '../pets.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { ParamsService } from '../params.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.page.html',
  styleUrls: ['./functions.page.scss'],
})
export class FunctionsPage implements OnInit {

  location

  constructor(
    public router: Router,
    private _location: Location,
    public alertCtrl: AlertController,
    public pets: PetsService,
    public params: ParamsService
  ) {
    this.location = params.locationData
  }

  ngOnInit() {}

  searchPerdidos() {
    this.params.statusData = 'PERDIDO'
    this.router.navigate(['/search'])
  }

  searchEncontrados() {
    this.params.statusData = 'ENCONTRADO'    
    this.router.navigate(['/search'])
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
    this.params.statusData = 'QUER_CRUZAR'    
    this.router.navigate(['/search'])
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
    this.params.petListData = results
    this.params.filterData = filter
    this.router.navigate(['/resultados'])
  }

  return() {
    this._location.back()
  }
}

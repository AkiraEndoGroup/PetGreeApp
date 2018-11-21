import { Component, OnInit, ViewChild } from '@angular/core';
import { ParamsService } from '../params.service';
import { Router } from '@angular/router';
import { PetsService, PetResponse } from '../pets.service';
import { AlertController, Slides } from '@ionic/angular';
import { Location } from '@angular/common';
import { Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: [
    './resultados.page.scss',
    '../home/home.page.scss'
  ],
})
export class ResultadosPage implements OnInit {
  @ViewChild(Slides) slides: Slides

  pets: PetResponse[]
  unavailable: boolean
  location: Geoposition
  filter
  cadastroDireto: boolean
  veioDeCadastro: boolean

  constructor(
    private _location: Location,
    private router: Router,
    private params: ParamsService,
    private alertCtrl: AlertController,
    private provider: PetsService
  ) {
    this.filter = params.filterData
    this.pets = params.petListData
    this.location = params.locationData
    this.unavailable = false
    this.cadastroDireto = false
    this.veioDeCadastro = false

    if (!this.filter || !this.filter.status) {
      this.router.navigate(['/cadastro']) // filter and location already in the service
    }

    if (!this.pets || this.pets.length <= 0) {
      this.pets = [
        {
          // placeholder
          name: "Indisponível",
          image_url: "assets/imgs/not-found.png"
        }
      ]
      this.unavailable = true
    }
    if (this.location && this.pets[0] && !this.pets[0].distanceToMe) { // prevent re-calculations
      this.pets = this.provider.getDistances(this.location, this.pets)
      console.log(this.pets);
    }
  }

  async ngOnInit() {
    if (this.filter.status) {
      if (this.unavailable) {
        if (this.filter.status == "PERDIDO" || this.filter.status == "ENCONTRADO") {
          let alert = await this.alertCtrl.create({
            header: "Nenhum pet encontrado :/",
            message: "Deseja cadastrar?",
            buttons: [
              {
                text: "Sim", handler: () => this.router.navigate(['/cadastro'])
              }, {
                text: "Não", handler: () => this.return()
              }
            ]
          })
          await alert.present()
        } else {
          let alert = await this.alertCtrl.create({
            header: "Nenhum pet encontrado :/",
            buttons: [{ text: "Voltar", handler: () => this.return() }]
          })
          await alert.present()
        }
      }
    }
  }

  goToPet() {
    this.slides.getActiveIndex().then(index => {
      this.router.navigate(['/perfil-pet', this.pets[index].id])
    }, err => console.log(err))
    .catch(err => console.log(err))
  }

  async thisIsIt() {
    let pet
    await this.slides.getActiveIndex()
    .then(index => pet = this.pets[index]
      , err => console.log(err))
    .catch(err => console.log(err))

    if (this.filter.status == 'PERDIDO') {
      let alert = await this.alertCtrl.create({
        header: "Você encontrou " + pet["name"] + "!",
        message: "O dono dele será informado, e logo deverá entrar em contato.",
        buttons: [{
          text: "Uhuul!", handler: () => {
            this.provider.notificateOwner(pet.id);
            this.router.navigate(['/home'])
          }
        }, "Cancelar"]
      })
      await alert.present()
    } else if (this.filter.status == 'ENCONTRADO') {
      let alert = await this.alertCtrl.create({
        header: "Você é o dono desse animal perdido?",
        message: "Se sim, vamos notificá-lo para que entre em contato!",
        buttons: [{
          text: "Sim!", handler: () => {
            this.provider.notificateFinder(pet.id);
            this.router.navigate(['/home'])
          }
        }, "Cancelar"]
      })
      await alert.present()
    } else if (this.filter.status == 'MACHUCADO') {
      // Você pode ajudar esse pet?
      // Entrar em contato com a pessoa que registrou
      let alert = await this.alertCtrl.create({
        header: "Você pode ajudar esse pet?",
        message: "Se sim, vamos notificar o usuário que o registrou!",
        buttons: [{
          text: "Sim!", handler: () => {
            this.provider.notificateMachucado(pet.id);
            this.router.navigate(['/home'])
          }
        }, "Cancelar"]
      })
      await alert.present()
    } else if (this.filter.status == 'DESABRIGADO') {
      // Você deseja ajudar esse pet?
      // Entrar em contato com a pessoa que registrou
      let alert = await this.alertCtrl.create({
        header: "Você pode abrigar esse pet?",
        message: "Se sim, vamos notificar o usuário que o registrou!",
        buttons: [{
          text: "Sim!", handler: () => {
            this.provider.notificateDesabrigado(pet.id);
            this.router.navigate(['/home'])
          }
        }, "Cancelar"]
      })
      await alert.present()
    } else if (this.filter.status == 'QUER_CRUZAR') {
      // Você deseja cruzar esse pet com o seu?
      // Entrar em contato com a pessoa que registrou
      let alert = await this.alertCtrl.create({
        header: "Você deseja contatar o dono desse pet?",
        message: "Se sim, vamos notificar ele!",
        buttons: [{
          text: "Sim!", handler: () => {
            this.provider.notificateCruzamento(pet.id);
            this.router.navigate(['/home'])
          }
        }, "Cancelar"]
      })
      await alert.present()
    }
  }

  async notHere() {
    if (this.filter.status == 'PERDIDO' || this.filter.status == 'ENCONTRADO') {
      let alert = await this.alertCtrl.create({
        header: "Animal ainda não cadastrado",
        message: "Deseja cadastrá-lo?",
        buttons: [{
          text: "Sim", handler: () => this.router.navigate(['/cadastro'])
        }, {
          text: "Não", handler: () => this.router.navigate(['/home'])
        }]
      })
      await alert.present()
    } else if (this.filter.status == 'MACHUCADO' || this.filter.status == 'DESABRIGADO' || this.filter.status == 'QUER_CRUZAR') {
      this.return()
    }
  }

  return() {
    this._location.back()
  }
}

import { Component, ViewChild, OnInit } from "@angular/core";
import { NavController, NavParams, AlertController, Slides } from '@ionic/angular';
import { Geoposition } from "@ionic-native/geolocation";
import { PetsProvider } from "../../providers/pets/pets";
import { HomePage } from "../home/home";
import { PerfilPetPage } from "../perfil-pet/perfil-pet";
import { CadastroPage } from "../cadastro/cadastro";

@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html'
})
export class ResultadosPage implements OnInit {
  @ViewChild(Slides) slides: Slides

  pets
  unavailable: boolean
  location: Geoposition
  filter
  cadastroDireto: boolean
  veioDeCadastro: boolean

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public provider: PetsProvider
  ) {
    this.filter = navParams.get('filter')
    this.pets = navParams.get('results')
    this.location = navParams.get('location')
    this.unavailable = false
    this.cadastroDireto = false
    this.veioDeCadastro = false

    if (!this.filter.status) {
      this.navCtrl.push(CadastroPage, {
        filter: this.filter,
        location: this.location
      })
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
    if (this.location) {
      this.pets = this.provider.getDistances(this.location, this.pets)
      console.log(this.pets);
    }
  }

  async ngOnInit() {
    console.log("unavailable: ", this.unavailable)
    if (this.filter.status) {
      if (this.unavailable) {
        if (this.filter.status == "PERDIDO" || this.filter.status == "ENCONTRADO") {
          let alert = await this.alertCtrl.create({
            header: "Nenhum pet encontrado :/",
            message: "Deseja cadastrar?",
            buttons: [
              {
                text: "Sim", handler: () => {
                  this.navCtrl.push(CadastroPage, {
                    filter: this.filter,
                    location: this.location
                  })
                }
              }, {
                text: "Não", handler: () => {
                  this.navCtrl.pop()
                }
              }
            ]
          })
          await alert.present()
        } else {
          console.log("here");

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
    let index = this.slides.realIndex
    let pet = this.pets[index]
    this.navCtrl.push(PerfilPetPage, {
      pet: pet
    })
  }

  async thisIsIt() {
    let pet = this.pets[this.slides.realIndex]
    if (this.filter.status == 'PERDIDO') {
      let alert = await this.alertCtrl.create({
        header: "Você encontrou " + pet["name"] + "!",
        message: "O dono dele será informado, e logo deverá entrar em contato.",
        buttons: [{
          text: "Uhuul!", handler: () => {
            this.provider.notificateOwner(pet["id"]);
            this.navCtrl.setRoot(HomePage);
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
            this.provider.notificatePerdido(pet["id"]);
            this.navCtrl.setRoot(HomePage);
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
            this.provider.notificateMachucado(pet["id"]);
            this.navCtrl.setRoot(HomePage);
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
            this.provider.notificateDesabrigado(pet["id"]);
            this.navCtrl.setRoot(HomePage);
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
            this.provider.notificateCruzamento(pet["id"]);
            this.navCtrl.setRoot(HomePage);
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
          text: "Sim", handler: () => {
            this.navCtrl.push(CadastroPage, {
              filter: this.filter,
              location: this.location
            })
          }
        }, {
          text: "Não", handler: () => {
            this.navCtrl.setRoot(HomePage)
          }
        }]
      })
      await alert.present()
    } else if (this.filter.status == 'MACHUCADO' || this.filter.status == 'DESABRIGADO' || this.filter.status == 'QUER_CRUZAR') {
      this.return()
    }
  }

  return() {
    this.navCtrl.pop()
  }
}
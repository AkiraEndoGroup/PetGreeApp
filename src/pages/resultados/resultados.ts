import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, AlertController, Slides } from "ionic-angular";
import { PetResponse } from "../../providers/interfaces/PetResponse";
import { Geoposition } from "@ionic-native/geolocation";
import { PetsProvider } from "../../providers/pets/pets";
import { HomePage } from "../home/home";
import { PerfilPetPage } from "../perfil-pet/perfil-pet";
import { CadastroPage } from "../cadastro/cadastro";

@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html'
})
export class ResultadosPage {
  @ViewChild(Slides) slides: Slides

  pets: PetResponse[]
  location: Geoposition
  filter

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public provider: PetsProvider
  ) {
    this.filter = navParams.get('filter')
    this.pets = navParams.get('results')
    this.location = navParams.get('location')
    if (this.location) {
      this.pets = this.provider.getDistances(this.location, this.pets)
      this.pets = this.provider.orderByDistanceToMe(this.pets)
      console.log(this.pets);
    }
  }

  goToPet() {
    let index = this.slides.realIndex
    let pet = this.pets[index]
    this.navCtrl.push(PerfilPetPage, {
      pet: pet
    })
  }

  thisIsIt() {
    let pet = this.pets[this.slides.realIndex]
    let alert = this.alertCtrl.create({
      title: "Você encontrou " + pet.name +  "!",
      message: "O dono dele será informado, e logo deverá entrar em contato.",
      buttons: [{
        text: "Uhuul!", handler: () => {
          this.provider.notificateOwner(pet.id);
          this.navCtrl.setRoot(HomePage);
        }
      }]
    })
    alert.present()
  }

  notHere() {
    let alert = this.alertCtrl.create({
      title: "Animal ainda não cadastrado",
      message: "Deseja cadastrá-lo? O dono pode vir à contatar para resgatá-lo.",
      buttons: [{
        text: "Sim", handler: () => {
          this.navCtrl.push(CadastroPage,{filter:this.filter})
        }
      },{
        text: "Não", handler: () => {
          this.navCtrl.setRoot(HomePage)
        }
      }]
    })
    alert.present()
  }

  return() {
    this.navCtrl.pop()
  }
}
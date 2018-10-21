import { Component, ViewChild, OnInit } from "@angular/core";
import { NavController, NavParams, AlertController, Slides } from "ionic-angular";
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
      this.pets = this.provider.orderByDistanceToMe(this.pets)
      console.log(this.pets);
    }
  }

  ngOnInit() {
    console.log("ngOnInit");
    
    if (this.unavailable) {
      console.log("passed");
      
      let alert = this.alertCtrl.create({
        title: "Nenhum pet encontrado :/",
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
      alert.present()
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
    if (this.filter.status == 'Perdido') {
      let alert = this.alertCtrl.create({
        title: "Você encontrou " + pet["name"] + "!",
        message: "O dono dele será informado, e logo deverá entrar em contato.",
        buttons: [{
          text: "Uhuul!", handler: () => {
            this.provider.notificateOwner(pet["id"]);
            this.navCtrl.setRoot(HomePage);
          }
        }]
      })
      alert.present()
    } else if (this.filter.status == 'Encontrado') {
      let alert = this.alertCtrl.create({
        title: "Você é o dono desse animal perdido?",
        message: "Se sim, vamos notificá-lo para que entre em contato!",
        buttons: [{
          text: "Sim!", handler: () => {
            this.provider.notificateOwner(pet["id"]);
            this.navCtrl.setRoot(HomePage);
          }
        }]
      })
      alert.present()
    }
  }

  notHere() {
    let alert = this.alertCtrl.create({
      title: "Animal ainda não cadastrado",
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
    alert.present()
  }

  return() {
    this.navCtrl.pop()
  }
}
import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, NavParams, AlertController, Slides, ModalController } from '@ionic/angular';
import { PetResponse } from "../../providers/interfaces/PetResponse";
import { Push } from "@ionic-native/push"
import { UsersProvider } from "../../providers/users/users";
import { UserResponse } from "../../providers/interfaces/UserResponse";
import { PerfilUserPage } from "../perfil-user/perfil-user";
import { HomePage } from "../home/home";
import { PetsProvider } from "../../providers/pets/pets";
import { PerfilPetEditPage } from "./perfil-pet-edit/perfil-pet-edit";
import { ModalShowImage } from "../../modals/modal-show-image";

@Component({
  selector: 'page-perfil-pet',
  templateUrl: 'perfil-pet.html'
})
export class PerfilPetPage implements OnInit {
  @ViewChild(Slides) slides: Slides

  pet: PetResponse
  fotos = []
  isCreator: boolean = false
  isOwner: boolean = false
  hasOwner: boolean = false
  attribs = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public push: Push,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public users: UsersProvider,
    public pets: PetsProvider
  ) {
    this.pet = navParams.get('pet')
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter")
    let petId = this.pet.id
    if (petId) {
      this.pets.getPetById(petId)
        .then((pet: PetResponse) => {
          this.pet = pet
          this.getAttribs()
        }, err => console.log(err))
        .catch(err => console.log(err))
    }
  }

  ngOnInit() {
    if (this.pet == null) {
      this.return()
    } else {
      this.users.getCurrentUser()
        .then((value: UserResponse) => {
          console.log(this.pet.owner_id);

          if (value.id == this.pet.owner_id) {
            this.isOwner = true
          }
          if (value.email == this.pet.created_by) {
            this.isCreator = true
          }
        })
      this.getAttribs()
      this.fotos.push(this.pet.image_url)
      this.pet.fotos.forEach(foto => {
        this.fotos.push(foto)
      })
    }
  }

  async showImage() {
    let modal = await this.modalCtrl.create(
      ModalShowImage,
      { image: this.fotos[this.slides.realIndex] })
      await modal.present();
  }

  async foundIt() {
    let alertMessage = await this.alertCtrl.create({
      header: "Você encontrou " + this.pet.name + "?",
      message: "Iremos notificar o dono para que ele entre em contato!",
      // TODO: enviar localização também
      // inputs: [{type: 'checkbox',checked: true,label:"Enviar minha localização atual"}],
      buttons: [
        {
          text: "Sim", handler: (data: any) => {
            if (data) {
              console.log('checked')
            }
            this.pets.notificateOwner(this.pet.id)
            alert("Notificação enviada! Muito obrigado!")
            this.navCtrl.setRoot(HomePage)
          }
        }, "Não"
      ]
    })
    await alertMessage.present();
  }

  goToOwner() {
    let owner_id = this.pet.owner_id;
    this.navCtrl.push(PerfilUserPage, {
      userId: owner_id
    })
  }

  getAttribs() {
    this.attribs = []
    if (this.pet.id) {
      this.attribs.push({
        key: "PetgreeID",
        value: this.pet.id
      })
    }
    if (this.pet.name) {
      this.attribs.push({
        key: "Nome",
        value: this.pet.name
      })
    }
    if (this.pet.type.description) {
      this.attribs.push({
        key: "Espécie",
        value: this.firstUp(this.pet.type.description)
      })
    }
    if (this.pet.raca) {
      this.attribs.push({
        key: "Raça",
        value: this.pet.raca
      })
    }
    if (this.pet.gender) {
      this.attribs.push({
        key: "Sexo",
        value: this.firstUp(this.pet.gender.description)
      })
    }
    if (this.pet.size) {
      this.attribs.push({
        key: "Tamanho",
        value: this.firstUp(this.pet.size.description)
      })
    }
    if (this.pet.pelo) {
      this.attribs.push({
        key: "Pêlo",
        value: this.firstUp(this.pet.pelo.description)
      })
    }
    if (this.pet.colors && this.pet.colors.length > 0) {
      let cores = ""
      this.pet.colors.forEach((value, index, array) => {
        cores = cores + this.firstUp(value.description)
        if (array[index + 1])
          cores = cores + ', '
      })
      this.attribs.push({
        key: "Cor",
        value: cores
      })
    }
    if (this.pet.owner_id) {
      this.hasOwner = true
      this.users.getUserById(this.pet.owner_id)
        .then((user: UserResponse) => {
          this.attribs.push({
            key: "Dono/a",
            value: user.avatar.name
          })
        }).catch(err => console.log(err))
    }
    if (this.pet.description) {
      this.attribs.push({
        key: "Descrição",
        value: this.pet.description
      })
    }
  }

  firstUp(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase()
  }

  editPet() {
    this.navCtrl.push(PerfilPetEditPage, {
      pet: this.pet
    })
  }

  alert(message) {
    alert(message)
  }

  return() {
    this.navCtrl.pop()
  }
}
import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { UserResponse, UserBuilder, formatAddress } from "../../providers/interfaces/UserResponse";
import { UsersProvider } from "../../providers/users/users";
import { AngularFireAuth } from "@angular/fire/auth";
import { PerfilUserEditPage } from "./perfil-user-edit/perfil-user-edit";
import { ModalShowImage } from "../../modals/modal-show-image";

@Component({
  selector: 'page-perfil-user',
  templateUrl: 'perfil-user.html'
})
export class PerfilUserPage {

  user = UserBuilder()
  attribs = []
  isCurrentUser: boolean = true
  imageName: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public users: UsersProvider,
    public afAuth: AngularFireAuth,
    public modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    let userId = this.navParams.get('userId')
    if (userId) {
      this.users.getUserById(userId).then((value: UserResponse) => {
        this.user = value
        this.getAttribs()
      })
    } else {
      let userEmail = this.navParams.get('email')
      if (userEmail) {
        this.users.getUserByEmail(userEmail).then((value: UserResponse) => {
          this.user = value
          this.getAttribs()
        })
      } else {
        this.users.getCurrentUser().then((value: UserResponse) => {
          if (value) {
            this.user = value
            this.getAttribs()
            if (this.user.id == null) {
              this.return()
            }
          } else {
            this.return()
          }
        })
      }
    }
  }

  getAttribs() {
    this.attribs = []

    if (this.user.id) {
      this.attribs.push({
        key: 'User ID',
        value: this.user.id
      })
    }
    if (this.user.avatar.bio) {
      this.attribs.push({
        key: 'Bio',
        value: this.user.avatar.bio
      })
    }
    if (this.user.avatar.idade) {
      this.attribs.push({
        key: 'Idade',
        value: this.user.avatar.idade
      })
    }
    if (this.user.email) {
      this.attribs.push({
        key: 'Email',
        value: this.user.email
      })
      if (this.user.email == this.afAuth.auth.currentUser.email) {
        this.isCurrentUser = true
      } else {
        this.isCurrentUser = false
      }
    }
    if (this.user.endereco) {
      let addr = '' + formatAddress(this.user.endereco)
      this.attribs.push({
        key: 'Endereço',
        value: addr
      })
    }
    if (this.user.telefones != null && this.user.telefones.length > 0) {
      this.user.telefones.forEach((value, index) => {
        this.attribs.push({
          key: 'Telefone ' + (index + 1),
          value: value
        })
      })
    }
    if (this.user.owned != null && this.user.owned.length > 0) {
      this.user.owned.forEach((value, index) => {
        this.attribs.push({
          key: 'Pet ' + (index + 1),
          value: 'Petgree ID: ' + value + '(inserir link)'
        })
      })
    }
  }

  async showImage() {
    let modal = await this.modalCtrl.create(
      ModalShowImage,
      { image: this.user.avatar.imageUrl })
      await modal.present();
  }

  editProfile() {
    this.navCtrl.push(PerfilUserEditPage,{user: this.user})
  }

  return() {
    this.navCtrl.pop()
  }
}
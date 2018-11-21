import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ParamsService } from '../params.service';
import { UsersService, formatAddress, UserResponse, UserBuilder } from '../users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { ShowImageModalPage } from '../show-image-modal/show-image-modal.page';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.page.html',
  styleUrls: [
    './perfil-user.page.scss',
    '../perfil-pet/perfil-pet.page.scss'
  ],
})
export class PerfilUserPage implements OnInit {

  user: UserResponse
  userId
  attribs = []
  isCurrentUser: boolean = true
  imageName: string

  subscribedLocation: boolean = false

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _location: Location,
    public params: ParamsService,
    public users: UsersService,
    public afAuth: AngularFireAuth,
    public modalCtrl: ModalController
  ) {
    this.user = { avatar: { name: "" } }
  }

  ngOnInit() {
    if (!this.subscribedLocation) {
      this._location.subscribe(
        (entered) => {
          if (entered.url.split('/')[1] == 'perfil-user') {
            console.log('came from edit')
            this.user = this.params.userData
            this.getAttribs()
          }
        }
      )
      this.subscribedLocation = true
    }
    let userId
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => userId = params.getAll('id'))
    )
    if (userId) {
      this.users.getUserById(userId).then((value: UserResponse) => {
        this.user = value
        this.getAttribs()
      })
    } else {
      this.users.getCurrentUser().then((value: UserResponse) => {
        if (value) {
          this.user = value
          this.getAttribs()
        } else {
          this.return()
        }
      })
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
          value: 'Petgree ID: ' + value
        })
      })
    }
  }

  async showImage() {
    this.params.imageData = this.user.avatar.imageUrl
    let modal = await this.modalCtrl.create({
      component: ShowImageModalPage,
      backdropDismiss: true
    })
    await modal.present();
  }

  editProfile() {
    this.params.userData = this.user
    this.router.navigate(['/perfil-user-edit']).catch(err => console.log(err))
  }

  return() {
    this._location.back()
  }
}

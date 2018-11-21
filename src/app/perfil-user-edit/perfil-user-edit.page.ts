import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { UserResponse, UsersService } from '../users.service';
import { CameraOptions, CameraResultType, CameraSource } from '@capacitor/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { ParamsService } from '../params.service';

import { Plugins } from '@capacitor/core'
import { EditAddressModalPage } from '../edit-address-modal/edit-address-modal.page';
import { EditPhonesModalPage } from '../edit-phones-modal/edit-phones-modal.page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil-user-edit',
  templateUrl: './perfil-user-edit.page.html',
  styleUrls: [
    './perfil-user-edit.page.scss',
    '../perfil-user/perfil-user.page.scss',
    '../perfil-pet/perfil-pet.page.scss'
  ],
})
export class PerfilUserEditPage implements OnInit {
  
  myForm: FormGroup
  user: UserResponse

  camOptions: CameraOptions = {
    resultType: CameraResultType.Base64,
    width: 300
  }
  picTaken: boolean
  imageData
  imageName
  imageUrl
  loading

  attribs = []
  telefones: [string]
  endereco
  name
  bio
  idade

  constructor(
    public router: Router,
    public _location: Location,
    public users: UsersService,
    public params: ParamsService,
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: AngularFireStorage,
    public afAuth: AngularFireAuth,
    public platform: Platform,
    public cdRef: ChangeDetectorRef
  ) {
    this.user = params.userData
    if (this.user == null) {
      this.return()
    } else {
      this.telefones = this.user.telefones
      this.endereco = this.user.endereco
      this.imageUrl = this.user.avatar.imageUrl
      this.myForm = this.fb.group({
        name: this.user.avatar.name,
        bio: this.user.avatar.bio,
        idade: this.user.avatar.idade
      })
    }
  }

  ngOnInit() {console.log('onInit')}

  onSubmit(form: NgForm) {
    let obj: any = form
    this.user.avatar.name = obj.name
    this.user.avatar.idade = obj.idade
    this.user.avatar.bio = obj.bio
    this.user.telefones = this.telefones
    this.user.endereco = this.endereco
    this.user.avatar.imageUrl = this.imageUrl
    this.saveChanges()
  }

  async changePicture() {
    const { Camera } = Plugins
    if (this.platform.is('cordova')) {
      let alert = await this.alertCtrl.create({
        header: "Adicionar foto",
        buttons: [
          {
            text: "Camera", handler: () => {
              this.camOptions.source = CameraSource.Camera
              Camera.getPhoto(this.camOptions)
                .then(async data => {
                  this.imageData = await this.base64ToBlob(data.base64Data)
                  this.uploadPicture()
                }, err => console.log(err))
                .catch(err => console.log(err))
            }
          }, {
            text: "Upload", handler: () => {
              this.camOptions.source = CameraSource.Photos
              Camera.getPhoto(this.camOptions)
                .then(async data => {
                  this.imageData = await this.base64ToBlob(data.base64Data)
                  this.uploadPicture()
                }, err => console.log(err))
                .catch(err => console.log(err))
            }
          }
        ]
      })
      alert.present()
    } else {
      let alert = await this.alertCtrl.create({message: "É preciso uma plataforma para adicionar fotos!", buttons: ["OK"]})
      alert.present()
    }
  }

  async uploadPicture() {
    if (this.imageData) {
      this.loading = await this.loadingCtrl.create({
        message: "Recebendo imagem...",
        spinner: 'dots'
      })
      this.loading.present()

      let storageRef = this.storage.ref('images/' + this.imageName + '.jpg')

      if (this.picTaken) {
        // If replacing pic, delete previous one from Firebase, 
        // or it will be a non-referenced resource
        storageRef.delete()
        .subscribe(data => console.log(data), err => console.log(err))
      }
      this.imageName = '' + this.afAuth.auth.currentUser.email + Date.now().valueOf();

      storageRef = this.storage.ref('images/' + this.imageName + '.jpg')


      storageRef.put(this.imageData)
        .then(async snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            this.picTaken = true
            this.imageUrl = url;
            this.cdRef.detectChanges()
            console.log(url)
            this.loading.dismiss()
          })
        })
        .catch(async err => {
          await this.loading.dismiss()
          let alert = await this.alertCtrl.create({ message: "Erro: " + err })
          alert.present()
          console.log(err)
        })
    }
  }

  // https://gist.github.com/fupslot/5015897
  base64ToBlob(dataURI) {

    // Convert base64 to raw binary data held in a string.
    const byteString = atob(dataURI.split(',')[1]);

    // Separate out the mime component.
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // Write the bytes of the string to an ArrayBuffer.
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Write the ArrayBuffer to a blob, and you're done.
    return new Blob([ab], { type: mimeString });
  }

  async editAddress() {
    this.params.addressData = this.user.endereco
    let modal = await this.modalCtrl.create({
      component: EditAddressModalPage,
      backdropDismiss: true
    })
    modal.present()
    modal.onDidDismiss().then(() => {
      this.endereco = this.params.addressData
    })
  }

  async editPhones() {
    this.params.phonesData = this.user.telefones
    let modal = await this.modalCtrl.create({
      component: EditPhonesModalPage,
      backdropDismiss: true
    })
    modal.present()
    modal.onDidDismiss().then(() => {
      this.telefones = this.params.phonesData      
    })
  }

  saveChanges() {
    console.log('saving changes');
    this.users.putUser(this.user).then(async data => {
      this.users.getUserById(this.user.id)
      .then(user => {
        this.params.userData = user
      })
      let alert = await this.alertCtrl.create({
        message: "Mudanças feitas!",
        buttons: [{ text: "OK", handler: () => this.return() }]
      })
      await alert.present()
    })
  }

  return() {
    this._location.back()
  }
}

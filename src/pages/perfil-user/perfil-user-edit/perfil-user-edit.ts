import { Component } from '@angular/core'
import { NavController, NavParams, ModalController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { UserResponse } from '../../../providers/interfaces/UserResponse';
import { UsersProvider } from '../../../providers/users/users'
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { ModalEditAddress } from '../../../modals/modal-edit-address';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalEditPhone } from '../../../modals/modal-edit-phone';

@Component({
  selector: 'page-perfil-user-edit',
  templateUrl: 'perfil-user-edit.html'
})
export class PerfilUserEditPage {
  
  myForm: FormGroup
  user: UserResponse

  camOptions: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetHeight: 300,
    targetWidth: 300
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
    public navCtrl: NavController,
    public users: UsersProvider,
    public navParams: NavParams,
    private fb: FormBuilder,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: AngularFireStorage,
    public afAuth: AngularFireAuth,
    public camera: Camera,
    public platform: Platform
  ) {
    this.user = navParams.get('user')
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

  changePicture() {
    if (this.platform.is('cordova')) {
      let alert = this.alertCtrl.create({
        title: "Adicionar foto",
        buttons: [
          {
            text: "Camera", handler: () => {
              this.camOptions.sourceType = this.camera.PictureSourceType.CAMERA
              this.camera.getPicture(this.camOptions)
                .then(data => {
                  this.imageData = this.dataURItoBlob('data:image/jpeg;base64,' + data)
                  this.uploadPicture()
                }, err => console.log(err))
                .catch(err => console.log(err))
            }
          }, {
            text: "Upload", handler: () => {
              this.camOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
              this.camera.getPicture(this.camOptions)
                .then(data => {
                  this.imageData = this.dataURItoBlob('data:image/jpeg;base64,' + data)
                  this.uploadPicture()
                }, err => console.log(err))
                .catch(err => console.log(err))
            }
          }
        ]
      })
      alert.present()
    } else {
      alert("É preciso uma plataforma para adicionar fotos!")
    }
  }

  uploadPicture() {
    if (this.imageData) {
      this.loading = this.loadingCtrl.create({
        content: "Recebendo imagem...",
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
        .then(snapshot => {
          this.loading.dismiss()
          snapshot.ref.getDownloadURL().then(url => {
            this.picTaken = true
            this.imageUrl = url;
          })
        })
        .catch(err => {
          this.loading.dismiss()
          let alert = this.alertCtrl.create({ message: "Erro: " + err })
          alert.present()
          console.log(err)
        })
    }
  }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  editAddress() {
    let modal = this.modalCtrl.create(ModalEditAddress, {address: this.user.endereco})
    modal.present()
    modal.onDidDismiss((address) => {
      console.log(address)
      if (address.length > 0)
        this.endereco = address
    })
  }

  editPhones() {
    let modal = this.modalCtrl.create(ModalEditPhone, { phones: this.user.telefones })
    modal.present()
    modal.onDidDismiss((phones) => {
      console.log(phones)
      this.telefones = phones      
    })
  }

  saveChanges() {
    console.log('saving changes');
    this.users.putUser(this.user).then(data => {
      this.return()
    })
  }

  return() {
    this.navCtrl.pop()
  }
}
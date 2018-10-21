import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, Platform, LoadingController } from "ionic-angular";
import { PetJSON } from "../../providers/interfaces/PetResponse";
import { PetsProvider } from "../../providers/pets/pets";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { UsersProvider } from "../../providers/users/users";
import { UserResponse } from "../../providers/interfaces/UserResponse";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  pet = PetJSON(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)

  filter
  location
  loading

  camOptions: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetHeight: 300,
    targetWidth: 300
  }
  imageData
  imageUrl = "https://via.placeholder.com/300x300"

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pets: PetsProvider,
    public users: UsersProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    public platform: Platform,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {
    this.filter = navParams.get('filter')
    this.location = navParams.get('location')
    this.parseColors()
  }

  parseColors() {
    if (this.filter.colors) {
      let colorsTxt = ''
      this.filter.colors.forEach((value, index, array) => {
        if (array[index + 1] == undefined) {
          colorsTxt += value
        } else {
          colorsTxt += value + ', '
        }
      })
      this.filter.colorsTxt = colorsTxt
    }
  }

  addPhoto() {
    if (this.platform.is('cordova')) {
      let alert = this.alertCtrl.create({
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
      alert("É preciso uma plataforma para adicionar imagens!")
    }
  }

  uploadPicture() {
    if (this.imageData) {
      this.loading = this.loadingCtrl.create({
        content: "Recebendo imagem...",
        spinner: 'dots'
      })
      this.loading.present()

      let imageName = '' + this.afAuth.auth.currentUser.email + Date.now().valueOf();
      let storageRef = this.storage.ref('images/' + imageName + '.jpg')

      let task = storageRef.put(this.imageData)
        .then(snapshot => {
          this.loading.dismiss()
          snapshot.ref.getDownloadURL().then(url => {
            this.imageUrl = url;
          })
        })
        .catch(err => {
          this.loading.dismiss()
          console.log(err)
        })
    }
  }

  postPet() {
    console.log(this.filter)
    console.log(this.location)

    if (this.filter.status == "Perdido") {
      this.pet.status = "Encontrado"
    }
    if (this.filter.status == "Encontrado") {
      this.pet.status = "Perdido"
    }
    if (this.imageUrl) {
      this.pet.image_url = this.imageUrl
    }
    if (this.filter.name) {
      this.pet.name = this.filter.name
    }
    if (this.filter.type) {
      this.pet.type = this.filter.type
    }
    if (this.filter.gender) {
      this.pet.gender = this.filter.gender
    }
    if (this.location) {
      this.pet.lat = this.location.latitude
      this.pet.lon = this.location.longitude
    }
    if (this.filter.colors) {
      this.pet.colors = this.filter.colors
    }
    if (this.filter.fur) {
      this.pet.pelo = this.filter.fur
    }
    if (this.filter.race) {
      this.pet.raca = this.filter.race
    }
    if (this.filter.size) {
      this.pet.size = this.filter.size
    }
    if (this.filter.description) {
      this.pet.description = this.filter.description
    }

    this.users.getCurrentUser().then((data: UserResponse) => {
      this.pet.created_by = data.email
      if (this.filter.status == "Perdido") {
        this.pet.owner_id = data.id
      }
    })

    console.log(this.pet)

    this.pets.postPet(this.pet)
      .then(data => {
        let alert = this.alertCtrl.create({
          title: "Obrigado!",
          message: "Logo mais esse pet estará bem!",
          buttons: [
            {
              text: "Voltar para página inicial",
              handler: () => {
                this.navCtrl.setRoot(HomePage)
              }
            }
          ]
        })
        alert.present()
      }).catch(err => {
        let alert = this.alertCtrl.create({
          title: "Erro",
          message: err
        })
      })

  }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  return() {
    this.navCtrl.pop()
  }
}
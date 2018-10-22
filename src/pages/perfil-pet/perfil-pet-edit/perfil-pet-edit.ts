import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Slides, AlertController, Platform, LoadingController, ModalController } from "ionic-angular";
import { PetJSON, PetResponse } from "../../../providers/interfaces/PetResponse";
import { FormGroup, FormBuilder, NgForm } from "@angular/forms";
import { PetsProvider } from "../../../providers/pets/pets";
import { AngularFireStorage } from "@angular/fire/storage";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AngularFireAuth } from "@angular/fire/auth";
import { ModalShowImage } from "../../../modals/modal-show-image";

@Component({
  selector: 'page-perfil-pet-edit',
  templateUrl: 'perfil-pet-edit.html'
})
export class PerfilPetEditPage {
  @ViewChild(Slides) slides: Slides

  myForm: FormGroup
  petModel
  pet: PetResponse

  camOptions: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetHeight: 300,
    targetWidth: 300
  }
  imageData
  loading

  name
  colors
  fotos

  colorsArray

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pets: PetsProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public fb: FormBuilder,
    public storage: AngularFireStorage,
    public afAuth: AngularFireAuth,
    public platform: Platform,
    public camera: Camera
  ) {
    this.pet = navParams.get('pet')
    if (this.pet == null) {
      this.return()
    }
    this.setAttribs()
  }

  setAttribs() {
    this.colorsArray = []
    let cores = ""
    this.pet.colors.forEach((value, index, array) => {
      cores = cores + this.firstUp(value.description)
      this.colorsArray.push(value.description)
      if (array[index + 1])
        cores = cores + ', '
    })
    this.colors = cores
    this.fotos = []
    this.fotos.push(this.pet.image_url)
    this.pet.fotos.forEach(foto => {
      this.fotos.push(foto)
    })

    this.myForm = this.fb.group({
      name: this.pet.name,
      status: this.pet.status.description,
      type: this.firstUp(this.pet.type.description),
      gender: this.firstUp(this.pet.gender.description),
      race: this.firstUp(this.pet.raca),
      size: this.firstUp(this.pet.size.description),
      pelo: this.firstUp(this.pet.pelo.description),
      description: this.firstUp(this.pet.description),
    })
  }

  onSubmit(form: NgForm) {
    let obj: any = form
    if (obj.description.length > 255) {
      obj.description = obj.description.slice(0,255)
    }
    this.petModel = PetJSON(
      obj.name,
      obj.type,
      obj.gender,
      obj.race,
      obj.size,
      obj.pelo,
      this.colorsArray,
      obj.description,
      this.fotos[0],
      this.fotos.slice(1, this.fotos.length),
      obj.status,
      this.pet.ong_email,
      this.pet.lat,
      this.pet.lon,
      this.pet.created_by,
      this.pet.owner_id
    )
    console.log(this.petModel)
    this.pets.putPet(this.petModel,this.pet.id)
    .then(data => {
      console.log(data)
      let alert = this.alertCtrl.create({
        message: "Mudanças feitas!",
        buttons: [{text: "OK", handler: () => this.return()}]
      })
      alert.present()
    })
    .catch(err => console.log(err))
  }

  changeColors() {
    // colors modal
  }

  firstUp(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase()
  }

  showImage() {
    let modal = this.modalCtrl.create(
      ModalShowImage,
      {image: this.fotos[this.slides.realIndex]})
    modal.present();
  }

  addPhoto() {
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
      let alert = this.alertCtrl.create({
        message: "É preciso uma plataforma para adicionar fotos!",
        buttons: ["OK"]
      })
      alert.present()
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

  uploadPicture() {
    if (this.imageData) {
      this.loading = this.loadingCtrl.create({
        content: "Recebendo imagem...",
        spinner: 'dots'
      })
      this.loading.present()

      let imageName = '' + this.afAuth.auth.currentUser.email + Date.now().valueOf();
      let storageRef = this.storage.ref('images/' + imageName + '.jpg')
      storageRef.put(this.imageData)
        .then(snapshot => {
          this.loading.dismiss()
          snapshot.ref.getDownloadURL().then(url => {
            this.fotos.push(url);
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

  removePhoto() {
    if (this.fotos.length == 1) {
      let alert = this.alertCtrl.create({
        message: "Deixe pelo menos uma foto!",
        buttons: ["OK"]
      })
      alert.present()
    } else {
      let index = this.slides.realIndex
      // Get file name to delete from Firebase Storage
      let filename: string = this.fotos[index];
      // Remove it
      this.fotos.splice(index, 1)
      // Remove from storage
      filename = filename.replace("https://firebasestorage.googleapis.com/v0/b/petgree-app.appspot.com/o/images%2F", "")
      filename = filename.replace("%40", "@")
      filename = filename.slice(0, filename.indexOf(".jpg")) + ".jpg"
      let storageRef = this.storage.ref('images/' + filename)
      storageRef.delete().subscribe(
        data => console.log(data),
        error => console.log(error)
      )
    }
  }

  putPet() {
    this.petModel.name = this.name
    // ...
    this.pets.putPet(this.petModel, this.pet.id)
      .then((data) => {
        console.log(data)
        let alert = this.alertCtrl.create({
          message: "Perfil de " + this.name + " atualizado!",
          buttons: [{ text: "OK", handler: () => this.return() }]
        })
        alert.present()
      }).catch(err => console.log(err))
  }

  return() {
    this.navCtrl.pop()
  }
}
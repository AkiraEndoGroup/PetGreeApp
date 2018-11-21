import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Slides, AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { PetResponse, PetsService, PetJSON } from '../pets.service';
import { Plugins, CameraOptions, CameraResultType, CameraSource } from '@capacitor/core'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { ParamsService } from '../params.service';
import { EditColorsModalPage } from '../edit-colors-modal/edit-colors-modal.page';
import { ShowImageModalPage } from '../show-image-modal/show-image-modal.page';

@Component({
  selector: 'app-perfil-pet-edit',
  templateUrl: './perfil-pet-edit.page.html',
  styleUrls: [
    './perfil-pet-edit.page.scss',
    '../perfil-pet/perfil-pet.page.scss',
    '../perfil-user/perfil-user.page.scss'
  ],
})
export class PerfilPetEditPage implements OnInit {
  @ViewChild(Slides) slides: Slides

  myForm: FormGroup
  petModel
  pet: PetResponse

  camOptions: CameraOptions = {
    resultType: CameraResultType.Base64,
    width: 300
  }
  imageData
  loading

  name
  colors
  fotos

  colorsArray

  constructor(
    public _location: Location,
    public router: Router,
    public pets: PetsService,
    public params: ParamsService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public fb: FormBuilder,
    public storage: AngularFireStorage,
    public afAuth: AngularFireAuth,
    public platform: Platform,
    public cdRef: ChangeDetectorRef
  ) {
    this.pet = params.petData
  }

  ngOnInit() {
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
      status: this.pet.status ? this.pet.status.description : '',
      type: this.pet.type ? this.firstUp(this.pet.type.description) : '',
      gender: this.pet.gender ? this.firstUp(this.pet.gender.description) : '',
      race: this.firstUp(this.pet.raca),
      size: this.pet.size ? this.firstUp(this.pet.size.description) : '',
      pelo: this.pet.pelo ? this.firstUp(this.pet.pelo.description) : '',
      description: this.firstUp(this.pet.description),
    })
  }

  onSubmit(form: NgForm) {
    console.log('onSubmit');

    let obj: any = form
    if (obj.description.length > 255) {
      obj.description = obj.description.slice(0, 255)
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
      this.pet.lat,
      this.pet.lon,
      this.pet.created_by,
      this.pet.owner_id
    )
    console.log(this.petModel)
    this.pets.putPet(this.petModel, this.pet.id)
      .then(async data => {
        console.log(data)
        await this.pets.getPetById(this.pet.id)
        .then(pet => {
          this.params.petData = pet
        })
        let alert = await this.alertCtrl.create({
          message: "Mudanças feitas!",
          buttons: [{ text: "OK", handler: () => this.return() }]
        })
        await alert.present()
      })
      .catch(err => console.log(err))
  }

  async changeColors() {
    this.params.colorsData = this.colorsArray
    let modal = await this.modalCtrl.create({
      component: EditColorsModalPage,
      backdropDismiss: true
    })
    modal.present()
    modal.onDidDismiss().then(() => {
      this.colorsArray = this.params.colorsData
    })
  }

  firstUp(word) {
    if (!word || word.length < 1)
      return null
    return word[0].toUpperCase() + word.substring(1).toLowerCase()
  }

  async showImage() {
    await this.slides.getActiveIndex().then((index) =>
      this.params.imageData = this.fotos[index])

    let modal = await this.modalCtrl.create({
      component: ShowImageModalPage,
      backdropDismiss: true
    })
    modal.present();
  }

  async addPhoto() {
    const { Camera } = Plugins
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
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
      let alert = await this.alertCtrl.create({
        message: "É preciso uma plataforma para adicionar fotos!",
        buttons: ["OK"]
      })
      await alert.present()
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

  async uploadPicture() {
    if (this.imageData) {
      this.loading = await this.loadingCtrl.create({
        message: "Recebendo imagem...",
        spinner: 'dots'
      })
      this.loading.present()

      let imageName = '' + Date.now().valueOf() + this.afAuth.auth.currentUser.email
      let storageRef = this.storage.ref('images/' + imageName + '.jpg')
      storageRef.put(this.imageData)
        .then(async snapshot => {
          await this.loading.dismiss()
          snapshot.ref.getDownloadURL().then(url => {
            this.fotos.push(url);
            this.slides.update()
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

  async removePhoto() {
    if (this.fotos.length == 1) {
      let alert = await this.alertCtrl.create({
        message: "Deixe pelo menos uma foto!",
        buttons: ["OK"]
      })
      await alert.present()
    } else {
      this.loading = await this.loadingCtrl.create({
        message: "Removendo",
        spinner: 'dots'
      })
      this.loading.present()
      let index
      await this.slides.getActiveIndex().then((value =>
        index = value))
      // Get file name to delete from Firebase Storage
      let filename: string = this.fotos[index];
      // Remove it
      this.fotos.splice(index, 1)
      // Update slides
      this.cdRef.detectChanges()
      this.slides.update()
      this.loading.dismiss()
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

  // putPet() {
  //   this.petModel.name = this.name
  //   console.log('putting ' + JSON.stringify(this.petModel))
  //   this.pets.putPet(this.petModel, this.pet.id)
  //     .then(async (data) => {
  //       console.log(data)
  //       let alert = await this.alertCtrl.create({
  //         message: "Perfil de " + this.name + " atualizado!",
  //         buttons: [{ text: "OK", handler: () => this.return() }]
  //       })
  //       alert.present()
  //     }).catch(err => console.log(err))
  // }

  return() {
    this._location.back()
  }
}

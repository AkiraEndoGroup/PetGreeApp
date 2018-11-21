import { Component, OnInit } from '@angular/core';
import { PetResponse, PetsService } from '../pets.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Plugins, CameraOptions, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/core';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { UsersService, UserResponse } from '../users.service';
import { ParamsService } from '../params.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: [
    '../perfil-pet/perfil-pet.page.scss',
    '../perfil-user/perfil-user.page.scss'
  ],
})
export class CadastroPage implements OnInit {

  pet: PetResponse

  filter: any
  location
  loading
  picTaken: boolean
  imageName: string

  name
  status

  myForm: FormGroup

  camOptions: CameraOptions = {
    resultType: CameraResultType.Base64,
    height: 300,
    width: 300
  }
  imageData
  imageUrl = "https://via.placeholder.com/300x300"

  constructor(
    private _location: Location,
    private router: Router,
    public params: ParamsService,
    public pets: PetsService,
    public users: UsersService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder
  ) {
    // Placeholder: objetos compostos vão quebrar quando o 
    // template tentar acessar os filhos, se eles não forem inicializados
    this.pet = {
      gender: null,
      type: null,
      pelo: null,
      size: null,
      status: null
    }
    this.filter = params.filterData ? params.filterData : {}
    this.location = params.locationData
    this.parseColors()
    this.picTaken = false;

    if (this.filter) {
      if (this.filter.status == "PERDIDO") {
        this.status = "ENCONTRADO"
      }
      if (this.filter.status == "ENCONTRADO") {
        this.status = "PERDIDO"
      }
    }
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: '',
      status: this.status ? this.status : 'OK'
    })
  }

  onSubmit(form: NgForm) {
    let obj: any = form
    this.name = obj.name
    this.status = obj.status

    this.postPet()
  }

  parseColors() {
    if (this.filter && this.filter.colors) {
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

  async addPhoto() {
    const { Camera } = Plugins
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      let alert = await this.alertCtrl.create({
        header: "Trocar foto",
        buttons: [
          {
            text: "Camera", handler: () => {
              this.camOptions.source = CameraSource.Camera
              Camera.getPhoto(this.camOptions)
                .then((data: CameraPhoto) => {
                  this.imageData = this.base64ToBlob(data.base64Data)
                  this.uploadPicture()
                }, err => console.log(err))
                .catch(err => console.log(err))
            }
          }, {
            text: "Upload", handler: () => {
              this.camOptions.source = CameraSource.Photos
              Camera.getPhoto(this.camOptions)
                .then((data: CameraPhoto) => {
                  this.imageData = this.base64ToBlob(data.base64Data)
                  // this.imageData = this.dataURItoBlob('data:image/jpeg;base64,' + data.path)
                  this.uploadPicture()
                }, err => console.log(err))
                .catch(err => console.log(err))
            }
          }
        ]
      })
      await alert.present()
    } else {
      alert("É preciso uma plataforma para adicionar fotos!")
    }
  }

  async uploadPicture() {
    if (this.imageData) {
      this.loading = await this.loadingCtrl.create({
        message: "Recebendo imagem...",
        spinner: 'dots'
      })
      await this.loading.present()

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
        .catch(async err => {
          this.loading.dismiss()
          let alert = await this.alertCtrl.create({ message: "Erro: " + err })
          await alert.present()
          console.log(err)
        })
    }
  }

  postPet() {
    console.log(this.filter)
    console.log(this.location)

    this.pet.status = this.status
    this.pet.name = this.name

    if (this.imageUrl) {
      this.pet.image_url = this.imageUrl
    }
    if (this.filter.name) {
      this.pet.name = this.filter.name
    }
    if (this.filter.type) {
      this.pet.type = this.filter.type
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
    if (this.filter.gender) {
      this.pet.gender = this.filter.gender
    }

    this.users.getCurrentUser().then((data: UserResponse) => {
      this.pet.created_by = data.email
      if (this.pet.status == "PERDIDO"
        || this.pet.status == "OK"
        || this.pet.status == "QUER_CRUZAR") {
        this.pet.owner_id = data.id
        console.log("user.id = " + data.id)
      }

      console.log(this.pet)

      this.pets.postPet(this.pet)
        .then(async data => {
          let alert = await this.alertCtrl.create({
            header: "Obrigado!",
            message: (this.filter.status != "QUER_CRUZAR"
              && this.filter.status != "OK") ? "Logo mais esse pet estará bem!" : '',
            buttons: [
              {
                text: "Voltar para página inicial",
                handler: () => this.router.navigate(['/home'])
              }
            ]
          })
          await alert.present()
        }, async err => {
          let alert = await this.alertCtrl.create({
            header: "Erro " + err.status,
            message: err
          })
          await alert.present()
        }).catch(async err => {
          let alert = await this.alertCtrl.create({
            header: "Erro " + err,
            message: err
          })
          await alert.present()
        })

    })
  }

  return() {
    this.params.veioDeCadastro = true
    this._location.back()
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
}

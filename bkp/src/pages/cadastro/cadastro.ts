import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, Platform, LoadingController } from "@ionic/angular";
import { PetJSON } from "../../providers/interfaces/PetResponse";
import { PetsProvider } from "../../providers/pets/pets";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { UsersProvider } from "../../providers/users/users";
import { UserResponse } from "../../providers/interfaces/UserResponse";
import { HomePage } from "../home/home";
import { FormGroup, FormBuilder, NgForm } from "@angular/forms";

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  pet = PetJSON(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)

  filter
  location
  loading
  picTaken: boolean
  imageName: string

  name
  status

  myForm: FormGroup

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
    private afAuth: AngularFireAuth,
    private fb: FormBuilder
  ) {
    this.filter = navParams.get('filter')
    this.location = navParams.get('location')
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
    if (this.platform.is('cordova')) {
      let alert = await this.alertCtrl.create({
        header: "Trocar foto",
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
      await alert.present()
    } else {
      alert("É preciso uma plataforma para adicionar fotos!")
    }
  }

  async uploadPicture() {
    if (this.imageData) {
      this.loading = await this.loadingCtrl.create({
        content: "Recebendo imagem...",
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
            message:  (this.filter.status != "QUER_CRUZAR"
                    && this.filter.status != "OK") ? "Logo mais esse pet estará bem!" : '',
            buttons: [
              {
                text: "Voltar para página inicial",
                handler: () => {
                  this.navCtrl.setRoot(HomePage)
                }
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

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  return() {
    this.navCtrl.getPrevious().data.veioDeCadastro = true
    this.navCtrl.pop()
  }
}
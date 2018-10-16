import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { NavParams, ViewController, LoadingController, Platform, AlertController } from 'ionic-angular';
import { FirebaseProvider } from '../providers/firebase/firebase';



@Component({
  selector: 'page-editprofile-modal',
  templateUrl: 'modal-edit-profile.html'
})
export class ModalEditProfile {

  avatar: any;

  newName: string;
  newIdade: string;
  newBio: string;
  newImage: any;
  newImageUrl: string;
  loading: any;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private camera: Camera,
    private fire: FirebaseProvider,
    private loadingCtrl: LoadingController,
    private imagePicker: ImagePicker,
    private platform: Platform,
    private alertCtrl: AlertController

  ) {
    this.avatar = navParams.get('avatar');
    console.log(this.avatar.imageUrl);
    this.newName = this.avatar.name;
    this.newIdade = this.avatar.idade;
    this.newBio = this.avatar.bio;
  }

  closeModal(save) {
    if (save) {
      this.viewCtrl.dismiss({
        name: this.newName,
        idade: this.newIdade,
        bio: this.newBio,
        imageUrl: this.newImageUrl
      });
    } else {
      this.viewCtrl.dismiss(false);
    }
  }

  takePic() {
    console.log("takePic()");
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 720,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.loading = this.loadingCtrl.create({
        content: "Carregando imagem..."
      });
      this.loading.present();
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.newImage = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
      this.uploadPic();
    }, (err) => {
      // Handle error
    });
  }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  uploadPic() {
    let name = '/images/' + new Date() + ".jpg";
    if (this.newImage) {
      var uploadTask = this.fire.storage.upload(name, this.newImage);
      // uploadTask.then(this.onSuccess, this.onError);
      uploadTask
        .then(snapshot => {
          this.loading.dismiss();
          snapshot.ref.getDownloadURL().then(url => {
            this.newImageUrl = url;
            console.log("Upload com sucesso. url: " + url);
            this.avatar.imageUrl = url;
          })
        })
        .catch(error => {
          console.log("Erro! " + error);
        });
    }
  }

  pickImage() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      if (this.imagePicker.hasReadPermission) {
        let options: ImagePickerOptions = {
          width: 1280,
          height: 1280,
          maximumImagesCount: 1
        }
        this.imagePicker.getPictures(options).then(
          result => {
            console.log(result);
          }
        )
      } else {
        this.imagePicker.requestReadPermission();
      }
    } else {
      let alert = this.alertCtrl.create({
        title: 'Dispositivo não suportado!',
        message: 'Upload só está disponível em Android e iOS :/',
        buttons: [ 'Aff...' ]
      });
      alert.present();
    }
  }
}
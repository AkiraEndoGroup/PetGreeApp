import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { FirebaseProvider } from '../../providers/firebase/firebase'

@Component({
  selector: 'page-insertpet-modal',
  templateUrl: 'modal-insert-pet.html'
})
export class ModalInsertPet {

  newPet = {name:"",type:"",gender:"",size:"",color:"",description:"",spots:false,image_url:""};
  name;
  type;
  gender;
  size;
  color;
  spots;
  description;

  loading;
  petImage;
  petImgURL = "./assets/imgs/placeholder.png";

  constructor(
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    private camera: Camera, 
    private loadingCtrl: LoadingController, 
    public fireProvider: FirebaseProvider
  ) {}

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
        content:"Carregando imagem..."
    });
    this.loading.present();
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    this.petImage = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
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
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }

  uploadPic() {
    let name = '/images/' + new Date() + ".jpg";
    if (this.petImage) {
      var uploadTask = this.fireProvider.storage.upload(name,this.petImage);
      // uploadTask.then(this.onSuccess, this.onError);
      uploadTask
      .then(snapshot => {
        this.loading.dismiss();
        snapshot.ref.getDownloadURL().then(url => {
          this.petImgURL = url;
          console.log("Upload com sucesso. url: " + url); 
          this.newPet.image_url = this.petImgURL;
        })
      })
      .catch(error => {
        console.log("Erro! " + error);
      });
    }
  }

  closeModal() {
    this.newPet.name = this.name;
    this.newPet.type = this.type;
    this.newPet.gender = this.gender;
    this.newPet.color = this.color;
    this.newPet.size = this.size;
    this.newPet.spots = this.spots;
    this.newPet.description = this.description;
    this.viewCtrl.dismiss(this.newPet);
  }
  // ...
}
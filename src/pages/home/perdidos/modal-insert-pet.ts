import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-insertpet-modal',
  templateUrl: 'modal-insert-pet.html'
})
export class ModalInsertPet {

    newPet = {};

    public petImage = "./assets/imgs/placeholder.png";

    constructor(public navParams: NavParams, public viewCtrl: ViewController, private camera: Camera) {}

    takePic() {
        console.log("takePic()");
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.petImage = 'data:image/jpeg;base64,' + imageData;

           }, (err) => {
            // Handle error
           });
    }

    closeModal() {
        this.viewCtrl.dismiss(this.newPet);
    }
    // ...
}
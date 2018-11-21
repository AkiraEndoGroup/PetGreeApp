import { Component, OnInit } from '@angular/core';
import { ParamsService } from '../params.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-image-modal',
  templateUrl: './show-image-modal.page.html',
  styleUrls: ['./show-image-modal.page.scss'],
})
export class ShowImageModalPage implements OnInit {

  imageUrl

  constructor(
    public params: ParamsService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('initializing image')
    this.imageUrl = this.params.imageData
  }

  closeModal() { this.modalCtrl.dismiss() }

}

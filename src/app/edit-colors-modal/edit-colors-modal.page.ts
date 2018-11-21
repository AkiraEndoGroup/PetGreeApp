import { Component, OnInit } from '@angular/core';
import { ParamsService } from '../params.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-colors-modal',
  templateUrl: './edit-colors-modal.page.html',
  styleUrls: [
    './edit-colors-modal.page.scss',
    '../search/search.page.scss'
  ],
})
export class EditColorsModalPage implements OnInit {

  colors;
  is

  constructor(
    public params: ParamsService,
    public modalCtrl: ModalController,
    public fb: FormBuilder
  ) {
    this.colors = params.colorsData
    if (this.colors == null) {
      this.colors = []
    }
    this.colors.forEach((value,index,array) => {
      array[index] = value.toLowerCase()
    });
    this.is = {}
    console.log(this.colors)
    this.is.white = (this.colors.indexOf("branco") > -1)
    this.is.black = (this.colors.indexOf("preto") > -1)
    this.is.brown = (this.colors.indexOf("marrom") > -1)
    this.is.orange = (this.colors.indexOf("laranja") > -1)
    this.is.beige = (this.colors.indexOf("beige") > -1)
    this.is.green = (this.colors.indexOf("outro") > -1)

  }

  ngOnInit() {}

  addColor(color) {
    this.is[color] = !this.is[color]
  }

  onSubmit() {
    let cores = []
    if (this.is.white)
      cores.push("Branco")
    if (this.is.black)
      cores.push("Preto")
    if (this.is.brown)
      cores.push("Marrom")
    if (this.is.orange)
      cores.push("Laranja")
    if (this.is.beige)
      cores.push("Beige")
    if (this.is.green)
      cores.push("Outro")

    this.closeModal(cores)
  }


  closeModal(data) {
    this.params.colorsData = data
    this.modalCtrl.dismiss().catch(err => console.log(err))
  }
}

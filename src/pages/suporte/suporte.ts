import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-suporte',
  templateUrl: 'suporte.html'
})
export class SuportePage {

  constructor(
    public navCtrl: NavController
    ) {}

  return() {
    this.navCtrl.pop()
  }
}
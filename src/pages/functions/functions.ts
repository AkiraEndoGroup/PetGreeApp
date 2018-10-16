import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-functions',
  templateUrl: 'functions.html'
})
export class FunctionsPage {

  constructor(
    public navCtrl: NavController
  ) {}

  return(){
    this.navCtrl.pop()
  }
}
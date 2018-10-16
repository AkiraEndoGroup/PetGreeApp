import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  @ViewChild('firstFocus') firstFocus

  filter
  focused: string
  type: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
      this.filter = navParams.get('filter')
      this.focused = 'location'
    }

    ionViewDidLoad() {
      console.log(this.firstFocus)
      this.firstFocus.nativeElement.focus()
    }

    focus(focus) {
      this.focused = focus
    }

    setType(type) {
      this.type = type
      console.log("type = " + type)
    }

    setGender(gender) {}

    setRace(race) {}

    setColor(color) {}

    setSize(size) {}

    setFur(fur) {}

    setDescription(description) {}

  return() {
    this.navCtrl.pop()
  }
}
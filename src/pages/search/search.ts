import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { PetsProvider } from "../../providers/pets/pets";
import { PetResponse } from "../../providers/interfaces/PetResponse";
import { Geolocation, Geoposition } from "@ionic-native/geolocation"
import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { timestamp } from "rxjs/operator/timestamp";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  filter
  focused: string

  location: any
  storedLocation: Geoposition
  locPressed: boolean
  locationAvailable: boolean
  locationText: string
  locationRange: number
  locRangeText: string
  gender: string
  type: string
  race: string
  raceList = []
  is: {
    white: boolean,
    black: boolean,
    brown: boolean,
    orange: boolean,
    beige: boolean,
    green: boolean
  }
  hasColors
  size: string
  fur: string
  description: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pets: PetsProvider,
    public geo: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public platform: Platform
  ) {
    this.filter = navParams.get('filter')
    this.focused = ' '
    this.is = { white: false, black: false, brown: false, orange: false, beige: false, green: false }
    this.locPressed = false
    this.locRangeText = "Nesse ponto"
    this.locationRange = 1
    geo.getCurrentPosition({ enableHighAccuracy: true })
      .then(resp => {
        this.locationAvailable = true
        console.log(resp)
        this.storedLocation = resp;
      }, error => {
        console.log(error)
        this.locationAvailable = false
      })
  }

  ionViewDidLoad() {
  }

  focus(focus) {
    this.focused = focus
  }

  togglePressed() {
    if (this.locationAvailable) {
      if (!this.locPressed) {
        this.location = this.storedLocation
        this.locPressed = true
      } else {
        this.location = undefined
        this.locPressed = false
      }
    } else {
      this.geo.getCurrentPosition({ enableHighAccuracy: true })
      .then(resp => {
        this.locationAvailable = true
        console.log(resp)
        this.storedLocation = resp;
      }, error => {
        console.log(error)
        this.locationAvailable = false
      })
    }
  }

  updateRangeText() {
    this.locRangeText = ["Nesse ponto", "Nesse bairro", "Nessa cidade", "Fora da cidade"][this.locationRange-1]
  }

  geocode() {
    if (this.locationText) {
      if (this.platform.is('cordova')) {
        let options: NativeGeocoderOptions = {
          defaultLocale: 'pt_BR',
          maxResults: 5,
          useLocale: true
        }
        this.nativeGeocoder.forwardGeocode(this.locationText, options)
        .then((result: NativeGeocoderForwardResult[]) => {
          console.log(result)
        })
      } else {
        console.log('no cordova, mocking location')
        this.location = {}
        let coords = {latitude: -1, longitude: -1} 
        this.location.coords = coords
      }
    }
  }

  setGender(gender) {
    if (gender == this.gender)
      this.gender = undefined
    else
      this.gender = gender
  }

  setType(type) {
    if (type != this.type) {
      this.race = undefined
    }
    this.type = type
    this.setRaceList(type)
  }

  setRaceList(type) {
    switch (type) {
      case 'Cachorro': {
        this.raceList = []
        this.raceList.push({ name: 'Vira-latas', img: "assets/imgs/races/cachorro-vira-latas.png" })
        this.raceList.push({ name: 'Poodle', img: "assets/imgs/races/poodle.png" })
        this.raceList.push({ name: 'Pinscher', img: "assets/imgs/races/pinscher.png" })
        this.raceList.push({ name: 'Pug', img: "assets/imgs/races/pug.png" })
        this.raceList.push({ name: 'Yorkshire', img: "assets/imgs/races/yorkshire.png" })
        this.raceList.push({ name: 'Dálmata', img: "assets/imgs/races/dalmata.png" })
        this.raceList.push({ name: 'Labrador', img: "assets/imgs/races/labrador.png" })
        this.raceList.push({ name: 'Buldogue', img: "assets/imgs/races/buldogue.png" })
        this.raceList.push({ name: 'Pastor Alemão', img: "assets/imgs/races/pastor-alemao.png" })
        this.raceList.push({ name: 'Beagle', img: "assets/imgs/races/beagle.png" })
        this.raceList.push({ name: 'Border Collie', img: "assets/imgs/races/border-collie.png" })
        this.raceList.push({ name: 'Não sei', img: "assets/imgs/search/other.png" })
        break
      }
      case 'Gato': {
        this.raceList = []
        this.raceList.push({ name: 'Vira-latas', img: "" })
        this.raceList.push({ name: 'Siamês', img: "" })
        this.raceList.push({ name: 'Angorá', img: "" })
        this.raceList.push({ name: 'British Shorthair', img: "" })
        this.raceList.push({ name: 'Não sei', img: "assets/imgs/search/other.png" })
        break
      }
      case 'Roedor': {
        this.raceList = []
        this.raceList.push({ name: 'Não sei', img: "assets/imgs/search/other.png" })
        break
      }
      case 'Cavalo': {
        this.raceList = []
        this.raceList.push({ name: 'Não sei', img: "assets/imgs/search/other.png" })
        break
      }
      case 'Réptil': {
        this.raceList = []
        this.raceList.push({ name: 'Não sei', img: "assets/imgs/search/other.png" })
        break
      }
      case 'Pássaro': {
        this.raceList = []
        this.raceList.push({ name: 'Não sei', img: "assets/imgs/search/other.png" })
        break
      } default: {
        this.raceList = []
        this.raceList.push({ name: 'Não sei', img: "assets/imgs/search/other.png" })
        break
      }
    }
  }

  setRace(race) {
    console.log(race);
    this.race = race
    if (race == "Não sei") {
      this.race = undefined
    }
  }

  addColor(color) {
    if (this.is == undefined) {
      this.is = { white: false, black: false, brown: false, orange: false, beige: false, green: false }
    }
    this.is[color] = !this.is[color]
    this.updateColors()
  }

  updateColors() {
    this.hasColors = (this.is.white || this.is.black || this.is.brown || this.is.orange || this.is.beige || this.is.green)
  }

  setSize(size) {
    this.size = size
  }

  doIt() {
    console.log(this.description)
  }

  setFur(fur) {
    this.fur = fur
  }

  setDescription(description) {
    this.description = description
  }

  saveFilters() {
    let filter = {
      status: this.filter,
      type: this.ptType(),
      gender: this.ptGender(),
      race: this.race,
      colors: this.is ? this.parseColors() : null,
      size: this.size ? this.size.replace(" ", "") : undefined,
      fur: this.fur,
      description: this.description,
      location: this.location
    }
    var results: PetResponse[];
    this.pets.getPetsByFilter(filter).then((res: PetResponse[]) => {
      results = res
      console.log(results)
    })
  }

  ptType() {
    switch (this.type) {
      case 'Réptil': return 'Reptil'
      case 'Pássaro': return 'Passaro'
      default: return this.type
    }
  }

  ptGender() {
    switch (this.gender) {
      case 'Fêmea': return 'Femea'
      default: return this.gender
    }
  }

  ptFur() {
    switch (this.fur) {
      case 'Médio': return 'Medio'
      default: return this.fur
    }
  }

  parseColors() {
    if (this.is
      && (this.is.white
        || this.is.black
        || this.is.brown
        || this.is.orange
        || this.is.beige
        || this.is.green)) {
      let arr = []
      if (this.is.white)
        arr.push("branco")
      if (this.is.black)
        arr.push("preto")
      if (this.is.brown)
        arr.push("marrom")
      if (this.is.orange)
        arr.push("laranja")
      if (this.is.beige)
        arr.push("beige")
      if (this.is.green)
        arr.push("outro")

      return arr
    }
    return null
  }

  return() {
    this.navCtrl.pop()
  }
}
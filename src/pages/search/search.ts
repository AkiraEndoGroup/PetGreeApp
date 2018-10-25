import { Component } from "@angular/core";
import { NavController, NavParams, Platform, AlertController, LoadingController } from "ionic-angular";
import { PetsProvider } from "../../providers/pets/pets";
import { PetResponse } from "../../providers/interfaces/PetResponse";
import { Geolocation, Geoposition } from "@ionic-native/geolocation"
import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { ResultadosPage } from "../resultados/resultados";
import { CadastroPage } from "../cadastro/cadastro";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  filter
  focused: string

  location: any
  storedLocation: any
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

  skipResultados: boolean

  loading

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public pets: PetsProvider,
    public geo: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public platform: Platform
  ) {
    this.filter = navParams.get('filter')
    this.storedLocation = navParams.get('location')
    this.focused = ' '
    this.is = { white: false, black: false, brown: false, orange: false, beige: false, green: false }
    this.locPressed = false
    this.locRangeText = "Nesse ponto"
    this.locationRange = 1
    this.skipResultados = false
    if (this.storedLocation) {
      this.locationAvailable = true
    } else {
      this.locationAvailable = false
    }
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
      this.loading = this.loadingCtrl.create({
        content: "Determinando localização",
        spinner: 'dots'
      })
      this.loading.present()
      this.geo.getCurrentPosition({ enableHighAccuracy: true })
        .then(resp => {
          this.locationAvailable = true
          this.storedLocation = resp.coords
          this.location = resp.coords
          this.locPressed = true
          this.loading.dismiss()
        }, error => {
          console.log(error)
          this.loading.dismiss()
          let alert = this.alertCtrl.create({
            title: 'Erro de localização',
            message: 'Não foi possível determinar sua localização.',
            buttons: ['OK :/']
          });
          alert.present();
          this.locationAvailable = false
        })
    }
  }

  updateRangeText() {
    this.locRangeText = ["Nesse ponto", "Nesse bairro", "Nessa cidade", "Fora da cidade"][this.locationRange - 1]
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
        let coords = { latitude: -1, longitude: -1 }
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
        this.raceList.push({ name: 'Vira-latas', img: "assets/imgs/races/gato-vira-latas.png" })
        this.raceList.push({ name: 'Siamês', img: "assets/imgs/races/siames.png" })
        this.raceList.push({ name: 'Angorá', img: "assets/imgs/races/angora.png" })
        this.raceList.push({ name: 'British Shorthair', img: "assets/imgs/races/british-shorthair.png" })
        this.raceList.push({ name: 'Não sei', img: "assets/imgs/search/other.png" })
        break
      }
      case 'Roedor': {
        this.raceList = []
        this.raceList.push({ name: 'Coelho', img: "assets/imgs/races/coelho.png" })
        this.raceList.push({ name: 'Hamster', img: "assets/imgs/races/hamster.png" })
        this.raceList.push({ name: 'Rato', img: "assets/imgs/races/rato.png" })
        this.raceList.push({ name: 'Chinchila', img: "assets/imgs/races/chinchila.png" })
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
        this.raceList.push({ name: 'Jabuti', img: "assets/imgs/races/jabuti.png" })
        this.raceList.push({ name: 'Tartaruga', img: "assets/imgs/races/tartaruga.png" })
        this.raceList.push({ name: 'Cobra', img: "assets/imgs/races/cobra.png" })
        this.raceList.push({ name: 'Iguana', img: "assets/imgs/races/iguana.png" })
        this.raceList.push({ name: 'Teiú', img: "assets/imgs/races/teiu.png" })
        this.raceList.push({ name: 'Dragão de Komodo', img: "assets/imgs/races/dragao-komodo.png" })
        this.raceList.push({ name: 'Gecko', img: "assets/imgs/races/gecko.png" })
        this.raceList.push({ name: 'Não sei', img: "assets/imgs/search/other.png" })
        break
      }
      case 'Pássaro': {
        this.raceList = []
        this.raceList.push({ name: 'Calopsita', img: "assets/imgs/races/calopsita.png" })
        this.raceList.push({ name: 'Papagaio', img: "assets/imgs/races/papagaio.png" })
        this.raceList.push({ name: 'Cacatua', img: "assets/imgs/races/cacatua.png" })
        this.raceList.push({ name: 'Periquito', img: "assets/imgs/races/periquito.png" })
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
    if (size == this.size) {
      this.size = undefined
    } else {
      this.size = size
    }
  }

  setFur(fur) {
    this.fur = fur
  }

  setDescription(description) {
    this.description = description
  }

  saveFilters() {
    if (!this.type) {
      let alert = this.alertCtrl.create({
        message: 'Precisamos saber o tipo de animal!',
        buttons: ['OK']
      })
      alert.present()
    } else {
      /**
       * Aqui os raios de busca são arbitrários, testados manualmente, não consegui uma forma simples de converter de km pra coordenada
       */
      let radius = [0.005, 0.01, 0.1, 10]
      console.log(this.location);

      let filter = {
        radius: radius[this.locationRange - 1],
        lat: this.location ? this.location.latitude : null,
        lon: this.location ? this.location.longitude : null,
        status: this.filter,
        type: this.ptType(),
        gender: this.ptGender(),
        race: this.race,
        colors: this.is ? this.parseColors() : null,
        size: this.size ? this.size.replace(" ", "") : undefined,
        fur: this.fur,
        description: this.description
      }
      /**
       * Se não veio com status é pq é um cadastro direto
       */
      if (filter.status) {
        this.pets.getPetsByFilter(filter).then((res: PetResponse[]) => {
          this.goToResults(res, filter)
        }).catch(err => console.log(err))
      } else {
        this.skipResultados = true
        console.log(filter)
        this.goToResults([], filter)
      }
    }
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
        arr.push("Branco")
      if (this.is.black)
        arr.push("Preto")
      if (this.is.brown)
        arr.push("Marrom")
      if (this.is.orange)
        arr.push("Laranja")
      if (this.is.beige)
        arr.push("Beige")
      if (this.is.green)
        arr.push("Outro")

      return arr
    }
    return null
  }

  goToResults(results, filter) {
    if (this.skipResultados) {
      this.navCtrl.push(CadastroPage, {
        location: this.location,
        filter: filter
      })
    } else {
      this.navCtrl.push(ResultadosPage, {
        results: results,
        location: this.location,
        filter: filter
      })
    }
  }

  return() {
    this.navCtrl.pop()
  }
}
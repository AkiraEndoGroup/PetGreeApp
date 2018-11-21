import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides, AlertController, ModalController } from '@ionic/angular';
import { PetsService, PetResponse, PetJSON } from '../pets.service';
import { UsersService, UserResponse } from '../users.service';
import { ParamsService } from '../params.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShowImageModalPage } from '../show-image-modal/show-image-modal.page';
import { reject } from 'q';

@Component({
  selector: 'app-perfil-pet',
  templateUrl: './perfil-pet.page.html',
  styleUrls: ['./perfil-pet.page.scss'],
})
export class PerfilPetPage implements OnInit {
  @ViewChild(Slides) slides: Slides

  pet: PetResponse
  petId
  fotos = []
  isCreator: boolean = false
  isOwner: boolean = false
  hasOwner: boolean = false
  attribs = []

  subscribedLocation: boolean = false

  constructor(
    private _location: Location,
    public router: Router,
    public route: ActivatedRoute,
    public params: ParamsService,
    // public push: Push,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public users: UsersService,
    public pets: PetsService
  ) {
    // placeholder
    this.pet = { name: "", status: { description: null, id: 0 } }
    
  }

  // ionViewWillEnter() {
  //   console.log("ionViewWillEnter")
  //   let petId = this.pet.id
  //   if (petId) {
  //     this.pets.getPetById(petId)
  //       .then((pet: PetResponse) => {
  //         this.pet = pet
  //         this.getAttribs()
  //       }, err => console.log(err))
  //       .catch(err => console.log(err))
  //   }
  // }

  async ngOnInit() {
    if (!this.subscribedLocation) {
      this._location.subscribe(
        (entered) => {
          if (entered.url.split('/')[1] == 'perfil-pet') {
            console.log('came from edit')
            this.pet = this.params.petData
            this.slides.update()
            this.getAttribs()
          }
        }
      )
      this.subscribedLocation = true
    }
    console.log('onInit')
    await this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.petId = params.getAll('id'))
    ).subscribe(async (data) => {
      if (this.petId == null) {
        this.return()
      } else {
        await this.pets.getPetById(this.petId).then((value: PetResponse) => {
          this.pet = value
          this.getAttribs()
          this.fotos.push(this.pet.image_url)
          this.pet.fotos.forEach(foto => {
            this.fotos.push(foto)
          })

          this.users.getCurrentUser()
            .then((value: UserResponse) => {
              if (value.id == this.pet.owner_id) {
                this.isOwner = true
              }
              if (value.email == this.pet.created_by) {
                this.isCreator = true
              }
            })
        })
      }
    })
  }

  async showImage() {
    let index
    await this.slides.getActiveIndex().then(i => index = i)
    this.params.imageData = this.fotos[index]
    const modal = await this.modalCtrl.create({
      component: ShowImageModalPage,
      backdropDismiss: true
    })
    console.log('present modal')
    await modal.present().then(() => console.log('then'))
      .catch(err => console.log(err))
  }

  async foundIt() {
    if (this.pet.status.description == "PERDIDO") {
      let alertMessage = await this.alertCtrl.create({
        header: "Você encontrou " + this.pet.name + "?",
        message: "Iremos notificar o dono para que ele entre em contato!",
        // TODO: enviar localização também
        // inputs: [{type: 'checkbox',checked: true,label:"Enviar minha localização atual"}],
        buttons: [
          {
            text: "Sim", handler: (data: any) => {
              if (data) {
                console.log('checked')
              }
              this.pets.notificateOwner(this.pet.id)
              alert("Notificação enviada! Muito obrigado!")
              this.router.navigate(['/home'])
            }
          }, "Não"
        ]
      })
      alertMessage.present()
    } else if (this.pet.status.description == "ENCONTRADO") {
      let alertMessage = await this.alertCtrl.create({
        header: "Você é o dono desse pet?",
        message: "Iremos notificar quem o encontrou para que ele entre em contato!",
        buttons: [
          {
            text: "Sim", handler: (data: any) => {
              if (data) {
                console.log('checked')
              }
              this.pets.notificateFinder(this.pet.id)
              alert("Notificação enviada! Muito obrigado!")
              this.router.navigate(['/home'])
            }
          }, "Não"
        ]
      })
      alertMessage.present()
    }

  }

  goToOwner() {
    let owner_id = this.pet.owner_id;
    this.router.navigate(['/perfil-user', owner_id])
  }

  getAttribs() {
    this.attribs = []
    if (this.pet.id) {
      this.attribs.push({
        key: "PetgreeID",
        value: this.pet.id
      })
    }
    if (this.pet.name) {
      this.attribs.push({
        key: "Nome",
        value: this.pet.name
      })
    }
    if (this.pet.type.description) {
      this.attribs.push({
        key: "Espécie",
        value: this.firstUp(this.pet.type.description)
      })
    }
    if (this.pet.raca) {
      this.attribs.push({
        key: "Raça",
        value: this.pet.raca
      })
    }
    if (this.pet.gender) {
      this.attribs.push({
        key: "Sexo",
        value: this.firstUp(this.pet.gender.description)
      })
    }
    if (this.pet.size) {
      this.attribs.push({
        key: "Tamanho",
        value: this.firstUp(this.pet.size.description)
      })
    }
    if (this.pet.pelo) {
      this.attribs.push({
        key: "Pêlo",
        value: this.firstUp(this.pet.pelo.description)
      })
    }
    if (this.pet.colors && this.pet.colors.length > 0) {
      let cores = ""
      this.pet.colors.forEach((value, index, array) => {
        cores = cores + this.firstUp(value.description)
        if (array[index + 1])
          cores = cores + ', '
      })
      this.attribs.push({
        key: "Cor",
        value: cores
      })
    }
    if (this.pet.owner_id) {
      this.hasOwner = true
      this.users.getUserById(this.pet.owner_id)
        .then((user: UserResponse) => {
          this.attribs.push({
            key: "Dono/a",
            value: user.avatar.name
          })
        }).catch(err => console.log(err))
    }
    if (this.pet.description) {
      this.attribs.push({
        key: "Descrição",
        value: this.pet.description
      })
    }
  }

  firstUp(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase()
  }

  editPet() {
    console.log('edit-pet')
    this.params.petData = this.pet
    this.params.context = this
    this.router.navigate(['/perfil-pet-edit']).catch(err => console.log(err))
  }



  alert(message) {
    alert(message)
  }

  return() {
    this._location.back()
  }
}

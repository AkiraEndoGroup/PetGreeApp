import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { PetsProvider } from "../../providers/pets/pets";
import { UsersProvider } from "../../providers/users/users";
import { UserResponse } from "../../providers/interfaces/UserResponse";
import { PerfilPetPage } from "../perfil-pet/perfil-pet";
import { SearchPage } from "../search/search";

@Component({
  selector: 'page-meuspets',
  templateUrl: 'meus-pets.html'
})
export class MeusPetsPage {

  pets

  constructor(
    public navCtrl: NavController,
    public petsProvider: PetsProvider,
    public usersProvider: UsersProvider
  ) {
    this.pets = []
    this.usersProvider.getCurrentUser()
      .then((res: UserResponse) => {
        res.owned.forEach(element => {
          this.petsProvider.getPetById(element)
            .then(pet => this.pets.push(pet))
            .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))
  }

  cadastrar() {
    this.navCtrl.push(SearchPage, {
      filter: null,
      location: null,
    })
  }

  goToPet(pet) {
    this.navCtrl.push(PerfilPetPage, {pet: pet})
  }

  return() {
    this.navCtrl.pop()
  }
}
import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { UsersService, UserResponse } from '../users.service';
import { Router } from '@angular/router';
import { ParamsService } from '../params.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-meus-pets',
  templateUrl: './meus-pets.page.html',
  styleUrls: ['./meus-pets.page.scss'],
})
export class MeusPetsPage implements OnInit {

  pets

  constructor(
    public router: Router,
    public _location: Location,
    public params: ParamsService,
    public petsProvider: PetsService,
    public usersProvider: UsersService
  ) {
    this.pets = []
  }

  async ngOnInit() {
    await this.usersProvider.getCurrentUser()
      .then((res: UserResponse) => {
        res.owned.forEach(async element => {
          await this.petsProvider.getPetById(element)
            .then(pet => this.pets.push(pet))
            .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))
  }

  cadastrar() {
    this.params.filterData = null
    this.params.locationData = null
    this.router.navigate(['/search'])
  }

  goToPet(pet) {
    this.params.petData = pet
    this.router.navigate(['/perfil-pet', pet.id])
  }

  return() {
    this._location.back()
  }
}

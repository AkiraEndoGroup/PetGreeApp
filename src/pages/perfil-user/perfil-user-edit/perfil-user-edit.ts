import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular';
import { UserResponse, formatAddress } from '../../../providers/interfaces/UserResponse';
import { UsersProvider } from '../../../providers/users/users'
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-perfil-user-edit',
  templateUrl: 'perfil-user-edit.html'
})
export class PerfilUserEditPage {
  
  myForm: FormGroup
  user: UserResponse

  attribs = []
  telefones: [string]
  endereco
  name
  bio
  idade

  constructor(
    public navCtrl: NavController,
    public users: UsersProvider,
    public navParams: NavParams,
    private fb: FormBuilder
  ) {
    this.user = navParams.get('user')
    if (this.user == null) {
      this.return()
    } else {
      this.telefones = this.user.telefones
      this.endereco = this.user.endereco
      this.myForm = fb.group({
        name: this.user.avatar.name,
        bio: this.user.avatar.bio,
        idade: this.user.avatar.idade
      })
    }
  }

  onSubmit(form: NgForm) {
    let obj: any = form
    this.user.avatar.name = obj.name
    this.user.avatar.idade = obj.idade
    this.user.avatar.bio = obj.bio
    this.user.telefones = this.telefones
    this.user.endereco = this.endereco
    this.saveChanges()
  }

  changePicture() {
    alert('todo!')
  }

  editAddress() {
    alert('todo!')
  }

  editPhones() {
    alert('todo!')
  }

  saveChanges() {
    console.log('saving changes');
    this.users.putUser(this.user).then(data => {
      this.return()
    })
  }

  return() {
    this.navCtrl.pop()
  }
}
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-editaddress-modal',
  templateUrl: 'modal-edit-address.html'
})
export class ModalEditAddress {

  myForm: FormGroup
  address;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public fb: FormBuilder
  ) {
    this.address = navParams.get('address');
    if (this.address == null) {
      this.address = {}
    }

    this.myForm = this.fb.group({
      rua: this.address.rua,
      numero: this.address.numero,
      complemento: this.address.complemento,
      cidade: this.address.cidade,
      estado: this.address.estado,
      cep: this.address.cep
    })
  }


  onSubmit(form: NgForm) {
    let obj: any = form
    this.address.rua = obj.rua
    this.address.numero = obj.numero
    this.address.complemento = obj.complemento
    this.address.cidade = obj.cidade
    this.address.estado = obj.estado
    this.address.cep = obj.cep

    this.closeModal(this.address)
  }


  closeModal(data) {
    this.viewCtrl.dismiss(data);
  }

}
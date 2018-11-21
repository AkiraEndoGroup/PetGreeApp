import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ParamsService } from '../params.service';

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.page.html',
  styleUrls: [
    './edit-address-modal.page.scss',
    '../perfil-user-edit/perfil-user-edit.page.scss',
    '../perfil-pet/perfil-pet.page.scss'
  ],
})
export class EditAddressModalPage implements OnInit {

  myForm: FormGroup
  address;

  constructor(
    public modalCtrl: ModalController,
    public params: ParamsService,
    public fb: FormBuilder
  ) {
    this.address = params.addressData
    if (this.address == null) {
      this.address = {}
    }
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log(this.address);    
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
    this.params.addressData = data
    this.modalCtrl.dismiss()
  }
}

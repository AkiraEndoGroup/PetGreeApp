import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ParamsService } from '../params.service';

@Component({
  selector: 'app-edit-phones-modal',
  templateUrl: './edit-phones-modal.page.html',
  styleUrls: ['./edit-phones-modal.page.scss'],
})
export class EditPhonesModalPage implements OnInit {

  items: FormArray
  phones: string[];
  fGroup: FormGroup
  valid: boolean

  constructor(
    public router: Router,
    public modalCtrl: ModalController,
    public fb: FormBuilder,
    public params: ParamsService
  ) {
    this.valid = true
    this.phones = params.phonesData

    this.fGroup = this.fb.group({
      items: this.fb.array([])
    })
  }

  ngOnInit() {
    if (this.phones == null) {
      this.phones = []
    }

    this.phones.forEach((value, index, array) => {
      this.items = this.fGroup.get('items') as FormArray
      let group = this.fb.group({
        name: '+55' + value.substring(3),
        valid: true
      })
      group.valueChanges.subscribe(val => { this.updateValid() })
      this.items.push(group)
    })
  }

  createItem(): FormGroup {
    let group = this.fb.group({
      name: '+55',
      valid: false
    })
    group.valueChanges.subscribe(val => { this.updateValid() })
    return group
  }

  addItem(): void {
    this.items = this.fGroup.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  updateValid() {
    this.valid = true
    this.items.controls.forEach(element => {
      if (!element.value.name.match(/^\+(55)[0-9]{10,11}$/)) {
        this.valid = false
        element.value.valid = false
      } else {
        element.value.valid = true
      }
    })
  }

  onSubmit() {
    this.phones = []
    this.items.value.forEach(element => {
      if (element.name.length > 0) {
        this.phones.push(element.name)
      }
    });

    this.closeModal()
  }

  removeItem(i): void {
    this.items = this.fGroup.get('items') as FormArray
    this.items.removeAt(i)
  }

  closeModal() {
    this.params.phonesData = this.phones
    this.modalCtrl.dismiss();
  }

  

}

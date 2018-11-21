import { Component } from '@angular/core';
import { NavParams, ViewController } from '@ionic/angular';
import { FormBuilder, NgForm, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-editphone-modal',
  templateUrl: 'modal-edit-phone.html'
})
export class ModalEditPhone {

  items: FormArray
  phones: string[];
  fGroup: FormGroup
  valid: boolean

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public fb: FormBuilder
  ) {
    this.valid = true
    this.phones = navParams.get('phones');
    if (this.phones == null) {
      this.phones = []
    }

    this.fGroup = this.fb.group({
      items: this.fb.array([])
    });

    this.phones.forEach((value, index, array) => {
      this.items = this.fGroup.get('items') as FormArray;
      let group = this.fb.group({
        name: '+55' + value.substring(3),
        valid: true
      })
      group.valueChanges.subscribe(val => { this.updateValid() })
      this.items.push(group)
    })
    console.log(this.fGroup)
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
    console.log('validating');
    console.log(this.items.controls);
    this.valid = true
    this.items.controls.forEach(element => {
      console.log(element)
      if (!element.value.name.match(/^\+(55)[0-9]{10,11}$/)) {
        this.valid = false
        element.value.valid = false
      } else {
        element.value.valid = true
      }
    });
  }

  onSubmit() {
    console.log('this.items.value')
    console.log(this.items.value)

    this.phones = []
    this.items.value.forEach(element => {
      if (element.name.length > 0) {
        this.phones.push(element.name)
      }
    });

    this.closeModal(this.phones)
  }

  removeItem(i): void {
    this.items = this.fGroup.get('items') as FormArray
    this.items.removeAt(i)
  }

  closeModal(data) {
    this.viewCtrl.dismiss(data);
  }

}
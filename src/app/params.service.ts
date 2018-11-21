import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  _petData
  _petListData
  _userData
  _locationData
  _statusData
  _filterData
  _imageData
  _colorsData
  _phonesData
  _addressData
  _emailData
  _veioDeCadastro
  _callbackFn
  _context

  constructor() { }
  
  get petData() {
    return this._petData
  }

  set petData(value) {
    this._petData = value
  }

  get petListData() {
    return this._petListData
  }

  set petListData(value) {
    this._petListData = value
  }

  get userData() {
    return this._userData
  }

  set userData(value) {
    this._userData = value
  }

  get locationData() {
    return this._locationData
  }

  set locationData(value) {
    this._locationData = value
  }

  get statusData() {
    return this._statusData
  }

  set statusData(value) {
    this._statusData = value
  }

  get filterData() {
    return this._filterData
  }

  set filterData(value) {
    this._filterData = value
  }

  get imageData() {
    return this._imageData
  }

  set imageData(value) {
    this._imageData = value
  }

  get colorsData() {
    return this._colorsData
  }

  set colorsData(value) {
    this._colorsData = value
  }

  get phonesData() {
    return this._phonesData
  }

  set phonesData(value) {
    this._phonesData = value
  }

  get addressData() {
    return this._addressData
  }

  set addressData(value) {
    this._addressData = value
  }

  get emailData() {
    return this._emailData
  }

  set emailData(value) {
    this._emailData = value
  }

  get veioDeCadastro() {
    return this._veioDeCadastro
  }

  set veioDeCadastro(value) {
    this._veioDeCadastro = value
  }

  get callbackFn() {
    return this._callbackFn
  }

  set callbackFn(value) {
    this._callbackFn = value
  }

  get context() {
    return this._context
  }

  set context(value) {
    this._context = value
  }

}

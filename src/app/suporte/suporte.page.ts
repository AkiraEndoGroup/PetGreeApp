import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.page.html',
  styleUrls: ['./suporte.page.scss'],
})
export class SuportePage implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  return() {
    this._location.back()
  }

}

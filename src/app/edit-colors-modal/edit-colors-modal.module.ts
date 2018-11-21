import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditColorsModalPage } from './edit-colors-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditColorsModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditColorsModalPage]
})
export class EditColorsModalPageModule {}

import { NgModule } from '@angular/core';

import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';
@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule, // <--- for angular directives
		IonicModule  // <--- for ionic components
	],
	exports: [LoginComponent]
})
export class ComponentsModule {}

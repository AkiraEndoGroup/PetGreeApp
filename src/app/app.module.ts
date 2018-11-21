import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShowImageModalPage } from './show-image-modal/show-image-modal.page';
import { ShowImageModalPageModule } from './show-image-modal/show-image-modal.module';
import { EditColorsModalPage } from './edit-colors-modal/edit-colors-modal.page';
import { EditColorsModalPageModule } from './edit-colors-modal/edit-colors-modal.module';
import { EditAddressModalPageModule } from './edit-address-modal/edit-address-modal.module';
import { EditPhonesModalPageModule } from './edit-phones-modal/edit-phones-modal.module';
import { EditAddressModalPage } from './edit-address-modal/edit-address-modal.page';
import { EditPhonesModalPage } from './edit-phones-modal/edit-phones-modal.page';

const firebaseConfig = {
  apiKey: "AIzaSyA3NSMbfS7Gwcd0S2LZQwnfvUSgazwCvYc",
  authDomain: "petgree-app.firebaseapp.com",
  databaseURL: "https://petgree-app.firebaseio.com",
  projectId: "petgree-app",
  storageBucket: "petgree-app.appspot.com",
  messagingSenderId: "806791357162"
};

@NgModule({
  declarations: [AppComponent, LoginComponent],
  entryComponents: [
    ShowImageModalPage,
    EditColorsModalPage,
    EditAddressModalPage,
    EditPhonesModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ShowImageModalPageModule,
    EditColorsModalPageModule,
    EditAddressModalPageModule,
    EditPhonesModalPageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig)],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ], exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

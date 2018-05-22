import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Camera } from '@ionic-native/camera'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusBar } from '@ionic-native/status-bar';
import { AnimatesDirective, AnimationService } from 'css-animator';
import { ModalInsertPet } from '../pages/home/perdidos/modal-insert-pet';
import { PagePerdidos } from '../pages/home/perdidos/perdidos';
import { AdocaoPage } from '../pages/adocao/adocao'
import { DataProvider } from '../providers/data/data';
// import { SplashScreen } from '@ionic-native/splash-screen';

var firebaseConfig = {
  apiKey: "AIzaSyAmn6JwCXZIJWXk7w9Ies3WCBOtxm_Jg8w",
  authDomain: "petgree-1b7e6.firebaseapp.com",
  databaseURL: "https://petgree-1b7e6.firebaseio.com",
  projectId: "petgree-1b7e6",
  storageBucket: "",
  messagingSenderId: "814325765331"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalInsertPet,
    PagePerdidos,
    AdocaoPage,
    AnimatesDirective
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalInsertPet,
    PagePerdidos,
    AdocaoPage
  ],
  providers: [
    StatusBar,
    Camera,
    AnimationService,
    InAppBrowser,
    DataProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}

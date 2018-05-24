import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage'

import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusBar } from '@ionic-native/status-bar';
import { AnimatesDirective, AnimationService } from 'css-animator';
import { ModalInsertPet } from '../pages/home/perdidos/modal-insert-pet';
import { ModalLogin } from '../pages/home/modal-login';
import { ModalSignup } from '../pages/home/modal-signup'
import { PagePerdidos } from '../pages/home/perdidos/perdidos';
import { AdocaoPage } from '../pages/adocao/adocao';

// Firebase modules
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA3NSMbfS7Gwcd0S2LZQwnfvUSgazwCvYc",
  authDomain: "petgree-app.firebaseapp.com",
  databaseURL: "https://petgree-app.firebaseio.com",
  projectId: "petgree-app",
  storageBucket: "petgree-app.appspot.com",
  messagingSenderId: "806791357162"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalInsertPet,
    ModalLogin,
    ModalSignup,
    PagePerdidos,
    AdocaoPage,
    AnimatesDirective
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    // AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalInsertPet,
    ModalLogin,
    ModalSignup,
    PagePerdidos,
    AdocaoPage
  ],
  providers: [
    StatusBar,
    Camera,
    AnimationService,
    FirebaseProvider,
    LoadingController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}

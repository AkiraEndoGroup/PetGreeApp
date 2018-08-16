import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController   } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage'

import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { AnimationService } from 'css-animator';
import { ModalInsertPet } from '../pages/modals/modal-insert-pet';
import { ModalLogin } from '../pages/modals/modal-login';
import { ModalSignup } from '../pages/modals/modal-signup';
import { ModalShowImage } from '../pages/modals/modal-show-image';
import { PagePerdidos } from '../pages/home/perdidos/perdidos';
import { PageMeusPets } from '../pages/meuspets/meuspets';
import { AdocaoPage } from '../pages/adocao/adocao';

// Firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { ModalEditProfile } from '../pages/modals/modal-edit-profile';

// Geolocation
import { Geolocation } from '@ionic-native/geolocation';

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
    ModalShowImage,
    ModalEditProfile,
    PagePerdidos,
    PageMeusPets
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
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
    ModalShowImage,
    ModalEditProfile,
    PagePerdidos,
    PageMeusPets,
    AdocaoPage
  ],
  providers: [
    StatusBar,
    Geolocation,
    Camera,
    EmailComposer,
    AnimationService,
    FirebaseProvider,
    LoadingController,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}

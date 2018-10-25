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
import { AnimationService } from 'css-animator';
import { ModalShowImage } from '../modals/modal-show-image';
import { PageTutorial } from '../pages/tutorial/tutorial'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { GooglePlus } from '@ionic-native/google-plus'
import { LoginComponent } from '../components/login/login';

import { Facebook } from '@ionic-native/facebook'

import { Geolocation } from '@ionic-native/geolocation';
import { PetsProvider } from '../providers/pets/pets';
import { SplashPage } from '../pages/splash/splash';
import { UsersProvider } from '../providers/users/users';
import { OngsProvider } from '../providers/ongs/ongs';
import { FunctionsPage } from '../pages/functions/functions';
import { SuportePage } from '../pages/suporte/suporte';
import { PerfilPetPage } from '../pages/perfil-pet/perfil-pet';
import { Push } from '@ionic-native/push';
import { PerfilUserPage } from '../pages/perfil-user/perfil-user';
import { PerfilUserEditPage } from '../pages/perfil-user/perfil-user-edit/perfil-user-edit';
import { SearchPage } from '../pages/search/search';
import { NativeGeocoder } from '@ionic-native/native-geocoder'
import { ResultadosPage } from '../pages/resultados/resultados';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { PerfilPetEditPage } from '../pages/perfil-pet/perfil-pet-edit/perfil-pet-edit';
import { ModalEditAddress } from '../modals/modal-edit-address';
import { ModalEditColors } from '../modals/modal-edit-colors';
import { MeusPetsPage } from '../pages/meus-pets/meus-pets';
import { ModalEditPhone } from '../modals/modal-edit-phone';

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
    ModalShowImage,
    ModalEditAddress,
    ModalEditColors,
    ModalEditPhone,
    PageTutorial,
    SplashPage,
    FunctionsPage,
    SuportePage,
    PerfilPetPage,
    PerfilPetEditPage,
    PerfilUserPage,
    PerfilUserEditPage,
    MeusPetsPage,
    SearchPage,
    CadastroPage,
    ResultadosPage,
    LoginComponent
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
    ModalShowImage,
    ModalEditAddress,
    ModalEditColors,
    ModalEditPhone,
    PageTutorial,
    SplashPage,
    FunctionsPage,
    SuportePage,
    PerfilPetPage,
    PerfilPetEditPage,
    PerfilUserPage,
    PerfilUserEditPage,
    MeusPetsPage,
    SearchPage,
    CadastroPage,
    ResultadosPage,
    LoginComponent
  ],
  providers: [
    StatusBar,
    Geolocation,
    NativeGeocoder,
    Camera,
    GooglePlus,
    EmailComposer,
    AnimationService,
    PetsProvider,
    UsersProvider,
    OngsProvider,
    LoadingController,
    Push,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}

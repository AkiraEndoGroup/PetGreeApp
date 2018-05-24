import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { Storage } from '@ionic/storage';

import { ModalController } from 'ionic-angular';
import { ModalLogin } from '../pages/home/modal-login';

import { FirebaseProvider } from '../providers/firebase/firebase';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  loggedIn: boolean;
  myEmail: string;
  loading;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar,
    private modalCtrl: ModalController,
    private fire: FirebaseProvider,
    private storage: Storage,
    private loadingCtrl: LoadingController) 
    {
      // login with current saved credentials
      storage.get("credentials")
        .then(data => {
          if (data) {
            var credentials = {
              email: data.email,
              password: data.password
            }
            console.log("credentials:\nemail -> " + credentials.email + "\npassword -> " + credentials.password);
            this.fire.signInWithEmail(credentials);
          } else console.log("data is null");
        });
      
      
      this.fire.auth.authState.subscribe(user => this.updateUserInfo());
      
      console.log('loggedIn: ' + this.loggedIn);
      console.log('myEmail: ' + this.myEmail);
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openLogin() {
    console.log('Opening login modal');
    let modal = this.modalCtrl.create(ModalLogin);

    modal.onDidDismiss(data => {
      this.storage.set("credentials",data);
      console.log('login dismissed');
      this.updateUserInfo();
    });

    modal.present();
  }

  logout() {
    this.loading = this.loadingCtrl.create({
      content:"Saindo..."
    });
    this.loading.present();
    console.log('logout');
    this.fire.signOut()
    .then(data => {
      console.log(data);
      this.storage.remove("credentials");
      this.updateUserInfo();
      this.loading.dismiss();
    })
    .catch(error => console.log('Error: ' + error.message));
  }

  updateUserInfo() {
    this.loggedIn = this.fire.authenticated;
    this.myEmail = this.fire.getEmail();
  }
}

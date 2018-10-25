import { Component, OnInit } from '@angular/core'

import * as firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs/Observable'

import { GooglePlus } from '@ionic-native/google-plus'
import { Platform, NavController, LoadingController, Loading, AlertController } from 'ionic-angular'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'
import { HomePage } from '../../pages/home/home';
import { PageTutorial } from '../../pages/tutorial/tutorial';
import { UsersProvider } from '../../providers/users/users';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../../providers/interfaces/UserResponse';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>

  usersUrl: string = 'http://localhost:4243/users'

  loggedGoogle: boolean = false
  loggedFacebook: boolean = false

  loading: Loading

  constructor(
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private facebook: Facebook,
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public users: UsersProvider,
    public http: HttpClient,
    public alertCtrl: AlertController
  ) {
    this.user = this.afAuth.authState
  }

  ngOnInit() {
    if (this.afAuth.auth.currentUser) {
      if (this.afAuth.auth.currentUser.providerData[0].providerId == 'facebook.com') {
        this.loggedFacebook = true
        this.loggedGoogle = false
      } else if (this.afAuth.auth.currentUser.providerData[0].providerId == 'google.com') {
        this.loggedGoogle = true
        this.loggedFacebook = false
      }
    }
  }

  presentLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
      spinner: 'dots'
    })
    this.loading.present()
  }

  dismissLoading() {
    this.loading.dismiss()
  }

  doAlert(message) {
    let alert = this.alertCtrl.create({
      message: message,
      buttons: ["Dismiss"]
    })
    // alert.present()
  }

  googleLogin() {
    this.presentLoading('Entrando...')
    if (this.platform.is('cordova') && !this.platform.is('core')) {
      this.doAlert("going google native")
      this.nativeGoogleLogin()
    } else {
      this.doAlert("going google web")
      this.webGoogleLogin()
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '806791357162-15il9fuf60ug50aauid300dg0fa7nuao.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      ).then((res) => {
        this.dismissLoading()
        this.doAlert("google native success - going proceed")
        this.loggedGoogle = true
        this.proceed()
      }).catch(err => {
        this.dismissLoading()
        this.doAlert("google native err: " + JSON.stringify(err))
        this.googleSignOut()
        this.loggedGoogle = false
        console.log(err)
      })
    } catch (error) {
      this.loggedGoogle = false
      this.dismissLoading()
      this.doAlert("native err2: " + JSON.stringify(error))
      this.googleSignOut()
      console.log(error)
    }

  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await this.afAuth.auth.signInWithPopup(provider)
        .then((res) => {
          this.dismissLoading()
          this.loggedGoogle = true
          this.proceed()
        }).catch(err => {
          this.dismissLoading()
          this.googleSignOut()
          alert('Erro: ' + err.message)
        })
    } catch (error) {
      this.dismissLoading()
      this.loggedGoogle = false
      this.googleSignOut()
      alert('Erro: ' + error.message)
    }
  }

  fbLogin() {
    this.presentLoading('Entrando...')
    if (this.platform.is('cordova')) {
      this.nativeFbLogin()
    } else {
      this.webFbLogin()
    }
  }

  nativeFbLogin() {
    this.facebook.login([
      'public_profile', 'email'
    ]).then((res: FacebookLoginResponse) => {
      if (res.status === 'connected') {
        // this.photoURL = 'https://graph.facebook.com/' + res.authResponse.userID + '/picture?type=square'
        this.dismissLoading()
        this.loggedFacebook = true
        // Login with firebase
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(res.authResponse.accessToken)
        firebase.auth().signInWithCredential(facebookCredential)
          .then(success => {
            this.proceed()
          })
      } else {
        this.dismissLoading()
        this.loggedFacebook = false
        alert('Falha no login')
      }
    }).catch((err) => {
      this.dismissLoading()
      alert('Erro: ' + err.message)
      console.log('Erro no login do facebook', err)
    })
  }

  webFbLogin() {
    var provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope('public_profile')
    provider.addScope('email')

    firebase.auth().languageCode = 'pt_BR'

    provider.setCustomParameters({
      'display': 'popup'
    })

    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        this.loggedFacebook = true
        this.dismissLoading()
        this.proceed()
        // this.photoURL = this.afAuth.auth.currentUser.photoURL
      }, err => {
        console.log(err)
        // this.doAlert("erro: " + JSON.stringify(err))
      }).catch((err) => {
        this.dismissLoading()
        this.loggedFacebook = false
        // this.doAlert("Erro: " + JSON.stringify(err))
      })
  }

  googleSignOut() {
    this.presentLoading('Saindo...')
    firebase.auth().signOut()
    if (this.platform.is('cordova')) {
      this.gplus.logout()
    }
    this.afAuth.auth.signOut()
    this.loggedGoogle = false
    this.dismissLoading()
    this.returnTutorial()
  }

  fbSignOut() {
    this.presentLoading('Saindo...')
    firebase.auth().signOut()
    this.afAuth.auth.signOut()
    this.loggedFacebook = false
    this.dismissLoading()
    this.returnTutorial()
  }

  returnTutorial() {
    this.navCtrl.setRoot(PageTutorial)
  }

  back() {
    this.navCtrl.pop()
  }

  proceed() {
    // First, check if user is in User API DB, if it's not, post it
    this.users.userExists().then((value) => {
      if (value) {
        this.navCtrl.setRoot(HomePage)
      } else {
        let thisUser: UserResponse = {
          id: null,
          email: this.afAuth.auth.currentUser.email,
          avatar: {
            id: null,
            name: this.afAuth.auth.currentUser.displayName,
            bio: null,
            idade: null,
            imageUrl: this.afAuth.auth.currentUser.photoURL
          },
          telefones: null,
          endereco: null,
          owned: null
        }

        this.http.post(this.usersUrl, thisUser)
          .subscribe(
            data => {
              let alert = this.alertCtrl.create({
                title: 'Usuário criado!',
                message: 'Agora você está cadastrado no sistema. Para editar seus dados, vá ao "Perfil", no menu lateral.',
                buttons: [{
                  text: "Começar!",
                  handler: () => {
                    this.navCtrl.setRoot(HomePage)
                  }
                }]
              })
              alert.present()
            }, error => {
              let alert = this.alertCtrl.create({
                title: 'Erro cadastrando usuário!',
                buttons: [{
                  text: "Começar!",
                  handler: () => {
                    this.navCtrl.setRoot(HomePage)
                  }
                }]
              })
              alert.present()
              if (this.afAuth.auth.currentUser) {
                if (this.afAuth.auth.currentUser.providerData[0].providerId == 'facebook.com') {
                  this.fbSignOut()
                } else if (this.afAuth.auth.currentUser.providerData[0].providerId == 'google.com') {
                  this.googleSignOut()
                }
              }
            })
      }
    })
  }
}

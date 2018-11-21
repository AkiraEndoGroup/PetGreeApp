import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { FacebookLoginResponse } from '@ionic-native/facebook';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

// Angular
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// Firebase
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

// Services
import { UserResponse, UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user

  usersUrl = 'http://ec2-18-228-44-159.sa-east-1.compute.amazonaws.com:4243/users';
  // usersUrl = 'http://localhost:4243/users'

  loggedGoogle: boolean = false
  loggedFacebook: boolean = false

  loading: any

  constructor(
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private facebook: Facebook,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    public loadingCtrl: LoadingController,
    public users: UsersService,
    public http: HttpClient,
    public alertCtrl: AlertController
  ) {
    this.user = this.afAuth.authState
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(value => {
      if (value) {
        if (value.providerData[0].providerId == 'facebook.com') {
          this.loggedFacebook = true
          this.loggedGoogle = false
        } else if (value.providerData[0].providerId == 'google.com') {
          this.loggedGoogle = true
          this.loggedFacebook = false
        }
      }
    })


  }

  async presentLoading(message) {
    this.loading = await this.loadingCtrl.create({
      message: message,
      spinner: 'dots'
    })
    await this.loading.present()
  }

  async dismissLoading() {
    await this.loading.dismiss()
  }

  async googleLogin() {
    await this.presentLoading('Entrando...')
    if ((this.platform.is('cordova') || this.platform.is('capacitor')) 
        && !this.platform.is('desktop')) {
      console.log("going google native")
      this.nativeGoogleLogin()
    } else {
      console.log("going google web")
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

      return await this.afAuth.auth.signInAndRetrieveDataWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      ).then(async (res) => {
        await this.dismissLoading()
        console.log("google native success - going proceed")
        this.loggedGoogle = true
        await this.proceed()
      }).catch(async err => {
        await this.dismissLoading()
        console.log("google native err: " + JSON.stringify(err))
        this.googleSignOut()
        this.loggedGoogle = false
        console.log(err)
      })
    } catch (error) {
      this.loggedGoogle = false
      this.dismissLoading()
      console.log("native err2: " + JSON.stringify(error))
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
          console.log('Erro: ' + err.message)
          this.dismissLoading()
          this.googleSignOut()
        })
    } catch (error) {
      this.dismissLoading()
      this.loggedGoogle = false
      this.googleSignOut()
      console.log('Erro: ' + error.message)
    }
  }

  async fbLogin() {
    await this.presentLoading('Entrando...')
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      this.nativeFbLogin()
    } else {
      this.webFbLogin()
    }
  }

  async nativeFbLogin() {
    this.facebook.login([
      'public_profile', 'email'
    ]).then(async (res: FacebookLoginResponse) => {
      console.log(res)
      if (res.status === 'connected') {
        // this.photoURL = 'https://graph.facebook.com/' + res.authResponse.userID + '/picture?type=square'
        await this.dismissLoading()
        this.loggedFacebook = true
        // Login with firebase
        const facebookCredential = await firebase.auth.FacebookAuthProvider
          .credential(res.authResponse.accessToken)
        firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
          .then(success => {
            console.log(success)
            this.proceed()
          })
      } else {
        await this.dismissLoading()
        this.fbSignOut()
        this.loggedFacebook = false
        console.log('Falha no login')
      }
    }).catch(async (err) => {
      await this.dismissLoading()
      this.fbSignOut()
      console.log('Erro: ' + err.message)
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
      }).catch((err) => {
        this.dismissLoading()
        this.loggedFacebook = false
      })
  }

  async googleSignOut() {
    await this.presentLoading('Saindo...')
    this.afAuth.authState.subscribe(async value => {
      if (value) {
        await this.afAuth.auth.signOut()
        if (this.platform.is('cordova') || this.platform.is('capacitor')) {
          await this.gplus.logout()
        }
        this.loggedGoogle = false
        await this.dismissLoading()
        this.returnTutorial()
      } else {
        console.log('wasn\'t logged in')
        this.dismissLoading()
      }
    }, err => {
      console.log(err)
      this.dismissLoading()
    })
  }

  async fbSignOut() {
    await this.presentLoading('Saindo...')
    this.afAuth.authState.subscribe(async value => {
      if (value) {
        await this.afAuth.auth.signOut()
        if (this.platform.is('cordova') || this.platform.is('capacitor')) {
          this.facebook.logout().catch(reason => console.log(reason))
        }
        this.loggedFacebook = false
        await this.dismissLoading()
        this.returnTutorial()
      } else {
        console.log('wasn\'t logged in')
        this.dismissLoading()
      }
    }, err => {
      console.log(err)
      this.dismissLoading()
    })
  }

  returnTutorial() {
    this.router.navigate(['/tutorial'])
  }

  back() {
    // pop
    this._location.back()
  }

  proceed() {
    // First, check if user is in User API DB, if it's not, post it
    console.log('will check if user exists')
    this.users.userExists().then((value) => {
      console.log('returned from promise, resolved -> ' + value)
      if (value) {
        this.router.navigate(['/home'])
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

        console.log('gonna post');
        console.log(thisUser);
        
        this.http.post(this.usersUrl, thisUser)
          .subscribe(
            async data => {
              console.log('post returned ok with')
              console.log(data)
              let alert = await this.alertCtrl.create({
                header: 'Usuário criado!',
                message: 'Agora você está cadastrado no sistema. Para editar seus dados, vá ao "Perfil", no menu lateral.',
                buttons: [{
                  text: "Começar!",
                  handler: () => {
                    this.router.navigate(['/home'])
                  }
                }]
              })
              await alert.present()
            }, async error => {
              console.log('post returned with error')
              console.log(error)
              let alert = await this.alertCtrl.create({
                header: 'Erro cadastrando usuário!',
                buttons: [{
                  text: "Voltar!",
                  handler: () => {
                    this.returnTutorial()
                  }
                }]
              })
              alert.onDidDismiss().then(() => {
                this.afAuth.authState.subscribe(value => {
                  if (value) {
                    if (value.providerData[0].providerId == 'facebook.com') {
                      this.fbSignOut()
                    } else if (value.providerData[0].providerId == 'google.com') {
                      this.googleSignOut()
                    }
                  }
                })
              })
              await alert.present()
            })
      }
    })
  }
}

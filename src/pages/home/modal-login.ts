import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ModalSignup } from './modal-signup';

@Component({
    selector: 'page-login-modal',
    templateUrl: 'modal-login.html'
  })
export class ModalLogin {

  loginForm: FormGroup;
  loginError: string;
  loading;

  user_api_url = "http://localhost:4243/users";
  userId;

  constructor(
    private http: HttpClient,
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, 
    fb: FormBuilder, 
    private loadingCtrl: LoadingController, 
    private fire: FirebaseProvider
  ) {
    this.loginForm = fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });
  }

  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };

    this.loading = this.loadingCtrl.create({
      content:"Entrando..."
    });
    this.loading.present();

    this.fire.signInWithEmail(credentials)
    .then(() => {
        this.loading.dismiss();
        if (this.fire.auth.auth.currentUser.emailVerified) {
          this.registerUserInDatabase(this.fire.auth.auth.currentUser.email);
          this.viewCtrl.dismiss(credentials);
        } else {
          this.loginError = 'Você precisa verificar seu email.';
          this.fire.signOut();
        }
      },
      error => {
        console.log("Erro: " + error);
        switch(error.code) {
        case 'auth/invalid-email':
          this.loginError = 'Email inválido.'; break;
        case 'auth/user-disabled':
          this.loginError = 'Essa conta de usuário foi desativada.'; break;
        case 'auth/user-not-found':
          this.loginError = 'O email digitado não está cadastrado ou foi removido.'; break;
        case 'auth/wrong-password':
          this.loginError = 'Senha incorreta.'; break;
        default:
          this.loginError = 'Erro desconhecido'; break;
        }
        this.loading.dismiss();
      }
    )
  }

  signup() {
      let modal = this.modalCtrl.create(ModalSignup);
      
      modal.onDidDismiss(data => {
          if (data) {
              this.loading = this.loadingCtrl.create({
                  content:"Entrando..."
              });
              this.loading.present();
      
              this.fire.signInWithEmail(data)
                  .then(
                      () => {
                          this.loading.dismiss();
                          this.viewCtrl.dismiss(data);
                      },
                      error => this.loginError = error.message
                  )
          }
      })
      
      modal.present();
  }

  registerUserInDatabase(email) {
    this.http.get(this.user_api_url + '/email/' + email)
    .subscribe((data) => {
      if (data == null) {
        let sent = { 'email': email };
        this.http.post(this.user_api_url,sent)
        .subscribe((data2) => {
          console.log(data2);
          if (data2 != null) {
            this.userId = data2['id'];            
          }
        });
      } else console.log('user already in database');
    });
  }

  close() {
      this.viewCtrl.dismiss(false);
  }
}
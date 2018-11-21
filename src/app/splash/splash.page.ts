import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  loading: any
  boot: any[]

  constructor(
    private router: Router,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    public menuCtrl: MenuController
  ) {
    this.boot = ['']
    menuCtrl.swipeEnable(false);
  }

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'dots'
    })
    await this.loading.present()
    Storage.get({ key: 'petgree' }).then(async obj => {
      if (obj.value) {
        // Se já executou antes, ir para login/home
        this.afAuth.authState.subscribe(value => {
          setTimeout(this.proceed, 500, this)
          if (this.afAuth.auth.currentUser) {
            // Já está logado
            this.boot = ['/home']
          } else {
            this.boot = ['/tutorial']
          }
          this.loading.dismiss()
        }, err => {
          console.log(err)
          this.boot = ['/tutorial']
        })
      } else {
        // Se nunca executou, ir para tutorial
        await this.loading.dismiss()
        this.boot = ['/tutorial']
        Storage.set({
          key: 'petgree',
          value: Date.now().toString()
        })
      }
    })
  }

  proceed(context) {
    context.router.navigate(context.boot)
  }
}

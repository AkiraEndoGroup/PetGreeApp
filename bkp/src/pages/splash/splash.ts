import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController, MenuController } from '@ionic/angular';
import { PageTutorial } from "../tutorial/tutorial";
import { Storage } from "@ionic/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { HomePage } from "../home/home";

@Component({
  selector: 'splash',
  templateUrl: 'splash.html'
})
export class SplashPage implements OnInit {

  loading: any
  boot: any
  afterSplash: boolean = false

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    public menuCtrl: MenuController
  ) {
    menuCtrl.swipeEnable(false);
  }

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'dots'
    })
    let init = async function (context) {
      await context.loading.present()
      setTimeout(context.proceed, 2000,context)

      context.storage.get('petgree').then(async data => {
        if (data) {
          // Se já executou antes, ir para login/home
          context.afAuth.authState.subscribe(async data => {
            if (data != null) {
              // Já está logado
              context.boot = HomePage
            } else {
              context.boot = PageTutorial
            }
            context.afterSplash = true
            await context.loading.dismiss()
          })
        } else {
          // Se nunca executou, ir para tutorial
          await context.loading.dismiss()
          context.boot = PageTutorial
          context.afterSplash = true
          context.storage.set('petgree',{firstRun:Date.now()})
        }
      })
    }
    setTimeout(init,1000,this)
  }

  proceed(context) {
    if (context.afterSplash) {
      context.navCtrl.setRoot(context.boot)
    }
  }
}
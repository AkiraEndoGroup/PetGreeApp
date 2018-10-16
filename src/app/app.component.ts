import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SplashPage } from '../pages/splash/splash';
import { HomePage } from '../pages/home/home';
import { PageTutorial } from '../pages/tutorial/tutorial';
import { LoginComponent } from '../components/login/login';
import { SuportePage } from '../pages/suporte/suporte';
import { PerfilUserPage } from '../pages/perfil-user/perfil-user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SplashPage;

  pages: Array<{ title: string, component: any }>;

  menus = [
    {name: "Início", component: HomePage},
    {name: "Perfil", component: PerfilUserPage},
    {name: "Tutorial", component: PageTutorial},
    {name: "Suporte", component: SuportePage},
    {name: "Sair", component: LoginComponent}
  ]

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public menuCtrl: MenuController
    ) {
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
    this.menuCtrl.close()
    this.nav.push(page.component,page.options);
  }

}

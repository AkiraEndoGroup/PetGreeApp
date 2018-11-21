import { Component, OnInit } from '@angular/core';

import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsersService, UserResponse } from './users.service';
import { Plugins } from '@capacitor/core';
import { Observable, bindCallback } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const { Geolocation, SplashScreen } = Plugins

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  coords

  menus = [
    {name: "Início", route: '/home' },
    {name: "Perfil", route: '/perfil-user', resource: 0 },
    {name: "Meus Pets", route: '/meus-pets' },
    {name: "Tutorial", route: '/tutorial' },
    {name: "Suporte", route: '/suporte' },
    {name: "Sair", route: '/login' }
  ]

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private users: UsersService,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    this.watchPosition().subscribe(coords => {
      this.coords = coords
    })
    SplashScreen.hide()
    await this.users.getCurrentUser()
    .then( async (user: UserResponse) => {
      if (user)
        this.menus[1].resource = await user.id
      else
        console.log(user);
    }).catch(err => console.log(err))
  }
  
  watchPosition(): Observable<any> {
    const watch = bindCallback(Geolocation.watchPosition)({});
    return watch.pipe(map((pos: any) => pos.coords))
  }

  openPage(page) {
    this.menuCtrl.close()
    if (page.resource) {
      console.log(page)
      this.router.navigate([page.route, page.resource])
    } else {
      this.router.navigate([page.route])
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { AnimationService, AnimationBuilder } from 'css-animator';
import { NavController, AlertController } from 'ionic-angular';
import { PagePerdidos } from './perdidos/perdidos';
import { AdocaoPage } from '../adocao/adocao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // ELEMENTOS FILHOS
  @ViewChild('botaoPerdidos') botaoPerdidos;
  @ViewChild('botaoAdocao') botaoAdocao;
  @ViewChild('botaoRegistro') botaoRegistro;
  private animator: AnimationBuilder;
  titulo = 'PetGree';


  constructor(
    animationService: AnimationService,
    public navCtrl: NavController,
    public alertCtrl: AlertController) {
    this.animator = animationService.builder();
  }

  // FUNÇÃO QUE GERENCIA OS BOTÕES DA TELA PRINCIPAL
  animarBotao(botao) {
    let elem;
    switch(botao) {
      case 'perdidos': {
        elem = this.botaoPerdidos.nativeElement; 
        elem.page = PagePerdidos;
        break;
      }
      case 'adocao': {
        elem = this.botaoAdocao.nativeElement; 
        elem.page = AdocaoPage;
        break;
      }
      case 'registro': {
        let alert = this.alertCtrl.create({
          title: "Opa!",
          message: "Em breve isso será implementado, rs! ^.^'",
          buttons: ['Hmpf!']
        });
        alert.present();
        break;
      }
    }
    if (elem) {
      this.animator.setType('pulse')
      .setDuration(300)
      .show(elem)
      .then(() => {
        if (elem.page)
          this.navCtrl.push(elem.page);
      })
      .catch(() => {
        this.animator.stop(elem);
      });
    }
  }
}

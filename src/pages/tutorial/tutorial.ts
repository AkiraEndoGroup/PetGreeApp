import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginComponent } from '../../components/login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'tutorial',
  templateUrl: 'tutorial.html'
})
export class PageTutorial {

  slides = []
  loading: any

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
  ) {
    let tuto1 = {
      image: "https://firebasestorage.googleapis.com/v0/b/petgree-app.appspot.com/o/tutorial%2Ftouching.png?alt=media&token=9ee60657-e2f9-410a-a3f2-9ea642575f11",
      title: "Tutorial",
      description: "Esse tutorial ajuda a entender como o aplicativo funciona. Você pode clicar no botão de \"pular\" ali no canto para pular esse tutorial.",
      final: false
    }
    let tuto2 = {
      image: "https://firebasestorage.googleapis.com/v0/b/petgree-app.appspot.com/o/tutorial%2Flooking.png?alt=media&token=05a87329-6f6e-4f10-bbf1-68d04b20201e",
      title: "Se precisa encontrar...",
      description: "Você pode entrar aqui procurando por seu bichinho que está perdido, ou se estiver procurando um que queira adotar.",
      final: false
    }
    let tuto3 = {
      image: "https://firebasestorage.googleapis.com/v0/b/petgree-app.appspot.com/o/tutorial%2Ffound.jpg?alt=media&token=d7ffc44e-5b3c-411b-ac10-0a935e16ee1b",
      title: "Ou se encontrou!",
      description: "Se encontrou algum pet perdido, pode registrar aqui, para tentar encontrar seu dono.",
      final: false
    }
    let tuto4 = {
      image: "https://firebasestorage.googleapis.com/v0/b/petgree-app.appspot.com/o/tutorial%2Floving.jpg?alt=media&token=f8875a2e-b7c7-43e5-bbb6-9e34428dacf8",
      title: "Se seu bichinho quer namorar",
      description: "Você também pode cadastrar os seus pets aqui, e caso eles estejam procurando parceiros para cruzar, pode clicar em \"Procurando parceiro\\a\".",
      final: false
    }
    let tuto5 = {
      image: "https://firebasestorage.googleapis.com/v0/b/petgree-app.appspot.com/o/tutorial%2Fpetting.jpg?alt=media&token=327f91c2-1cea-4548-9242-8fd96061be34",
      title: "Se você pode oferecer tratamento e abrigo por um tempo",
      description: "Se você quer ajudar algum bichinho em situação de vulnerabilidade, pode procurar aqui por animais que estão precisando de acolhimento e ajuda.",
      final: false
    }
    let tutoFinal = {
      image: "https://firebasestorage.googleapis.com/v0/b/petgree-app.appspot.com/o/tutorial%2Fgoing.png?alt=media&token=ee190812-651f-4773-b2bf-a7ea91e195c1",
      title: "Vamos começar!",
      description: "Só precisamos que você se autentique com uma conta Google ou com o Facebook.",
      final: true
    }

    this.slides.push(tuto1);
    this.slides.push(tuto2);
    this.slides.push(tuto3);
    this.slides.push(tuto4);
    this.slides.push(tuto5);
    this.slides.push(tutoFinal);
  }

  start() {
    if (this.afAuth.auth.currentUser) {
      // TODO: Go to Home
      this.navCtrl.push(HomePage)
    } else {
      this.navCtrl.push(LoginComponent)
    }
  }

  skipTutorial() {
    if (this.afAuth.auth.currentUser) {
      // TODO: Go to Home
      this.navCtrl.push(HomePage)
    } else {
      this.navCtrl.push(LoginComponent)
    }
  }
}
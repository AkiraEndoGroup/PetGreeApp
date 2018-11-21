import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Slides } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  @ViewChild('mySlides') mySlides: Slides

  slides = []
  loading: any

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth
  ) {
    let tuto1 = {
      image: "assets/imgs/touching.png",
      title: "Tutorial",
      description: "Esse tutorial ajuda a entender como o aplicativo funciona. Você pode clicar no botão de \"pular\" ali no canto para pular esse tutorial.",
      final: false
    }
    let tuto2 = {
      image: "assets/imgs/looking.png",
      title: "Se precisa encontrar...",
      description: "Você pode entrar aqui procurando por seu bichinho que está perdido, ou se estiver procurando um que queira adotar.",
      final: false
    }
    let tuto3 = {
      image: "assets/imgs/found.jpg",
      title: "Ou se encontrou!",
      description: "Se encontrou algum pet perdido, pode registrar aqui, para tentar encontrar seu dono.",
      final: false
    }
    let tuto4 = {
      image: "assets/imgs/loving.jpg",
      title: "Se seu bichinho quer namorar",
      description: "Você também pode cadastrar os seus pets aqui, e caso eles estejam procurando parceiros para cruzar, pode clicar em \"Procurando parceiro\\a\".",
      final: false
    }
    let tuto5 = {
      image: "assets/imgs/petting.jpg",
      title: "Se você pode oferecer tratamento e abrigo por um tempo",
      description: "Se você quer ajudar algum bichinho em situação de vulnerabilidade, pode procurar aqui por animais que estão precisando de acolhimento e ajuda.",
      final: false
    }
    let tutoFinal = {
      image: "assets/imgs/going.png",
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

  ngOnInit() {
    this.mySlides.slideTo(0)
    this.mySlides.ionSlideTouchEnd.subscribe(() => this.mySlides.slideNext())
    this.mySlides.ionSlideTransitionEnd.subscribe(() => this.mySlides.startAutoplay())
  }

  start() {
    if (this.afAuth.auth.currentUser) {
      // TODO: Go to Home
      this.router.navigate(['/home'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  skipTutorial() {
    if (this.afAuth.auth.currentUser) {
      // TODO: Go to Home
      this.router.navigate(['/home'])      
    } else {
      this.router.navigate(['/login'])      
    }
  }

}

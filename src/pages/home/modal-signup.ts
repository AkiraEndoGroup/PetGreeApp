import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
	selector: 'page-signup-modal',
	templateUrl: 'modal-signup.html'
})
export class ModalSignup {
    signupError: string;
    form: FormGroup;
    loading;
    
    constructor(
		fb: FormBuilder,
		public viewCtrl: ViewController, 
        private fire: FirebaseProvider,
        private loadingCtrl: LoadingController
	) {
		this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
    }

    signup() {
        let data = this.form.value;
        
		let credentials = {
			email: data.email,
			password: data.password
        };

        this.loading = this.loadingCtrl.create({
            content:"Cadastrando..."
        });
        this.loading.present();
        
        this.fire.signUp(credentials)
        .then(
			() => {
                this.loading.dismiss();
                this.viewCtrl.dismiss(credentials);
            },
			error => {
                console.log(error);
                if (error.code == 'auth/email-already-in-use')
                    this.signupError = 'Esse endereço de email já está sendo usado por outra conta.';
                this.loading.dismiss();
            }
		);
    }
    closeModal() {
        this.viewCtrl.dismiss(false);
    }
}
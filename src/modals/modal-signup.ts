import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController, LoadingController, ToastController } from 'ionic-angular';
import { FirebaseProvider } from '../providers/firebase/firebase';

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
        private loadingCtrl: LoadingController,
        public toastCtrl: ToastController
	) {
		this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			passconfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		}, { validator: ModalSignup.passwordsMatch });
    }

    static passwordsMatch(cg: FormGroup) {
        let p1 = cg.get('password');
        let p2 = cg.get('passconfirm');
        let rv: { [error: string]: any } = {};
        if ((p1.touched || p2.touched) && p1.value !== p2.value) {
            rv['passwordMismatch'] = true;
        }
        return rv;
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
                // Enviar email de verificação
                this.fire.auth.auth.currentUser.sendEmailVerification();
                this.displayEmailToastAndLeave();
            },
			error => {
                console.log(error);
                if (error.code == 'auth/email-already-in-use')
                    this.signupError = 'Esse endereço de email já está sendo usado por outra conta.';
                this.loading.dismiss();
            }
		);
    }

    displayEmailToastAndLeave() {
        let toast = this.toastCtrl.create({
            message: 'Email de verificação enviado.',
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            this.viewCtrl.dismiss(false);
        });

        toast.present();
    }

    close() {
        this.viewCtrl.dismiss(false);
    }
}
webpackJsonp([1],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdocaoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_firebase_firebase__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AdocaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdocaoPage = /** @class */ (function () {
    function AdocaoPage(navCtrl, navParams, fireProvider) {
        // fireProvider.getItems().valueChanges().subscribe(data => {
        //   console.log(data);
        //   data.forEach(element => {
        //     console.log(element);
        //     for(var key in element) {
        //       this.items.push(element[key]);
        //       this.keys.push(key);
        //     }
        //     console.log('items:\n' + this.items);
        //     console.log('keys:\n' + this.keys);
        //   });
        // });
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fireProvider = fireProvider;
        this.title = 'Adoção';
        this.items = new Array();
        this.keys = new Array();
        this.newItem = '';
        this.imgURL = '';
        this.fireProvider.getURL().subscribe(function (data) {
            _this.items.push(data);
            console.log(data);
            _this.imgURL = data;
        });
    }
    AdocaoPage.prototype.addItem = function () {
        var pet = {
            type: 'Cachorro',
            gender: 'Macho',
            size: 'medio',
            color: 'preto',
            spots: false,
            description: 'Muito bonito.'
        };
        this.fireProvider.addItem(pet);
    };
    AdocaoPage.prototype.removeItem = function (elem) {
        this.fireProvider.removeItem(elem);
    };
    AdocaoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-adocao',template:/*ion-inline-start:"/home/yagod/petGree/src/pages/adocao/adocao.html"*/`<ion-header>\n \n    <ion-navbar color="primary">\n      <ion-title>{{title}}</ion-title>\n    </ion-navbar>\n  </ion-header>\n   \n   \n  <ion-content>\n      <ion-row>\n          <ion-col col-9>\n            <ion-item>\n              <ion-input type="text" [(ngModel)]="newItem" placeholder="New Shopping item"></ion-input>\n            </ion-item>\n          </ion-col>\n          <ion-col>\n            <button ion-button (click)="addItem()">Add!</ion-fab-button>\n          </ion-col>\n        </ion-row>\n\n      <ion-list>\n          Items\n          <ion-item-sliding *ngFor="let item of items">\n            <ion-item>\n              {{item}}\n            </ion-item>\n            <ion-item-options side="right">\n              <button ion-button color="danger" icon-only (click)="removeItem(\'lista\')"><ion-icon name="trash"></ion-icon></ion-fab-button>\n            </ion-item-options>\n          </ion-item-sliding>\n        </ion-list>\n\n        <img src="{{imgURL}}" placeholder="blabla"/>\n  </ion-content>`/*ion-inline-end:"/home/yagod/petGree/src/pages/adocao/adocao.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_firebase_firebase__["a" /* FirebaseProvider */]])
    ], AdocaoPage);
    return AdocaoPage;
}());

//# sourceMappingURL=adocao.js.map

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/adocao/adocao.module": [
		478,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 228;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalLogin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase_firebase__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_signup__ = __webpack_require__(285);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ModalLogin = /** @class */ (function () {
    function ModalLogin(navParams, viewCtrl, modalCtrl, fb, loadingCtrl, fire) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.fire = fire;
        this.loginForm = fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].email])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)])]
        });
    }
    ModalLogin.prototype.login = function () {
        var _this = this;
        var data = this.loginForm.value;
        if (!data.email) {
            return;
        }
        var credentials = {
            email: data.email,
            password: data.password
        };
        this.loading = this.loadingCtrl.create({
            content: "Entrando..."
        });
        this.loading.present();
        this.fire.signInWithEmail(credentials)
            .then(function () {
            _this.loading.dismiss();
            if (_this.fire.auth.auth.currentUser.emailVerified) {
                _this.viewCtrl.dismiss(credentials);
            }
            else {
                _this.loginError = 'Você precisa verificar seu email.';
                _this.fire.signOut();
            }
        }, function (error) {
            console.log("Erro: " + error);
            switch (error.code) {
                case 'auth/invalid-email':
                    _this.loginError = 'Email inválido.';
                    break;
                case 'auth/user-disabled':
                    _this.loginError = 'Essa conta de usuário foi desativada.';
                    break;
                case 'auth/user-not-found':
                    _this.loginError = 'O email digitado não está cadastrado ou foi removido.';
                    break;
                case 'auth/wrong-password':
                    _this.loginError = 'Senha incorreta.';
                    break;
                default:
                    _this.loginError = 'Erro desconhecido';
                    break;
            }
            _this.loading.dismiss();
        });
    };
    ModalLogin.prototype.signup = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modal_signup__["a" /* ModalSignup */]);
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.loading = _this.loadingCtrl.create({
                    content: "Entrando..."
                });
                _this.loading.present();
                _this.fire.signInWithEmail(data)
                    .then(function () {
                    _this.loading.dismiss();
                    _this.viewCtrl.dismiss(data);
                }, function (error) { return _this.loginError = error.message; });
            }
        });
        modal.present();
    };
    ModalLogin.prototype.close = function () {
        this.viewCtrl.dismiss(false);
    };
    ModalLogin = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login-modal',template:/*ion-inline-start:"/home/yagod/petGree/src/pages/home/modal-login.html"*/`<ion-header>\n    <ion-navbar>\n        <ion-title>Entrar</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <form (ngSubmit)="login()" [formGroup]="loginForm">\n        <ion-list inset>\n\n            <ion-item>\n                <ion-input type="text" placeholder="Email" formControlName="email"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-input type="password" placeholder="Senha" formControlName="password"></ion-input>\n            </ion-item>\n        </ion-list>\n\n        <div padding-horizontal>\n            <div class="form-error">{{loginError}}</div>\n\n            <ion-row>\n                <ion-col col-6>\n                    <button ion-button full type="submit" [disabled]="!loginForm.valid">Entrar</ion-fab-button>\n                </ion-col>\n                <ion-col col-6>\n                    <button ion-button block type="button" (click)="close()">Cancelar</ion-fab-button>\n                </ion-col>\n            </ion-row>\n\n            <div class="login-footer">\n                <p>\n                    <a href="#">Clique aqui se esqueceu sua senha.</a>\n                    <br />\n                    Se você é um usuário novo, por favor, cadastre-se.\n                </p>\n            </div>\n            <button ion-button icon-left block clear (click)="signup()">\n                <ion-icon name="person-add"></ion-icon>\n                Cadastrar\n             </ion-fab-button>\n        </div>\n    </form>\n</ion-content>`/*ion-inline-end:"/home/yagod/petGree/src/pages/home/modal-login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_firebase_firebase__["a" /* FirebaseProvider */]])
    ], ModalLogin);
    return ModalLogin;
}());

//# sourceMappingURL=modal-login.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalSignup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase_firebase__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModalSignup = /** @class */ (function () {
    function ModalSignup(fb, viewCtrl, fire, loadingCtrl, toastCtrl) {
        this.viewCtrl = viewCtrl;
        this.fire = fire;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.form = fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].email])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6)])],
            passconfirm: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6)])]
        }, { validator: ModalSignup_1.passwordsMatch });
    }
    ModalSignup_1 = ModalSignup;
    ModalSignup.passwordsMatch = function (cg) {
        var p1 = cg.get('password');
        var p2 = cg.get('passconfirm');
        var rv = {};
        if ((p1.touched || p2.touched) && p1.value !== p2.value) {
            rv['passwordMismatch'] = true;
        }
        return rv;
    };
    ModalSignup.prototype.signup = function () {
        var _this = this;
        var data = this.form.value;
        var credentials = {
            email: data.email,
            password: data.password
        };
        this.loading = this.loadingCtrl.create({
            content: "Cadastrando..."
        });
        this.loading.present();
        this.fire.signUp(credentials)
            .then(function () {
            _this.loading.dismiss();
            // Enviar email de verificação
            _this.fire.auth.auth.currentUser.sendEmailVerification();
            _this.displayEmailToastAndLeave();
        }, function (error) {
            console.log(error);
            if (error.code == 'auth/email-already-in-use')
                _this.signupError = 'Esse endereço de email já está sendo usado por outra conta.';
            _this.loading.dismiss();
        });
    };
    ModalSignup.prototype.displayEmailToastAndLeave = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: 'Email de verificação enviado.',
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            _this.viewCtrl.dismiss(false);
        });
        toast.present();
    };
    ModalSignup.prototype.close = function () {
        this.viewCtrl.dismiss(false);
    };
    ModalSignup = ModalSignup_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signup-modal',template:/*ion-inline-start:"/home/yagod/petGree/src/pages/home/modal-signup.html"*/`<ion-header>\n    <ion-navbar>\n        <ion-title>Cadastro</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <form (ngSubmit)="signup()" [formGroup]="form">\n        <ion-list inset>\n\n            <ion-item>\n                <ion-input type="text" placeholder="Email" formControlName="email"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-input type="password" placeholder="Senha" formControlName="password"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-input type="password" placeholder="Confirme a senha" formControlName="passconfirm"></ion-input>\n            </ion-item>\n\n        </ion-list>\n\n        <div padding-horizontal >\n            <div class="form-error">{{signupError}}</div>\n            <ion-row>\n                <ion-col col-6>\n                    <button ion-button block type="submit" [disabled]="!form.valid">Cadastrar</ion-fab-button>\n                </ion-col>\n                <ion-col col-6>\n                    <button ion-button block type="button" (click)="close()">Cancelar</ion-fab-button>\n                </ion-col>\n            </ion-row>\n        </div>\n    </form>\n</ion-content>`/*ion-inline-end:"/home/yagod/petGree/src/pages/home/modal-signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_firebase_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */]])
    ], ModalSignup);
    return ModalSignup;
    var ModalSignup_1;
}());

//# sourceMappingURL=modal-signup.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_css_animator__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_css_animator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_css_animator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__perdidos_perdidos__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__adocao_adocao__ = __webpack_require__(152);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(animationService, navCtrl) {
        this.navCtrl = navCtrl;
        this.titulo = 'PetGree';
        this.animator = animationService.builder();
    }
    // FUNÇÃO QUE GERENCIA OS BOTÕES DA TELA PRINCIPAL
    HomePage.prototype.animarBotao = function (botao) {
        var _this = this;
        var elem;
        switch (botao) {
            case 'perdidos': {
                elem = this.botaoPerdidos.nativeElement;
                elem.page = __WEBPACK_IMPORTED_MODULE_3__perdidos_perdidos__["a" /* PagePerdidos */];
                break;
            }
            case 'adocao': {
                elem = this.botaoAdocao.nativeElement;
                elem.page = __WEBPACK_IMPORTED_MODULE_4__adocao_adocao__["a" /* AdocaoPage */];
                break;
            }
            case 'registro': {
                elem = this.botaoRegistro.nativeElement;
                break;
            }
        }
        if (elem) {
            this.animator.setType('pulse')
                .setDuration(300)
                .show(elem)
                .then(function () {
                if (elem.page)
                    _this.navCtrl.push(elem.page);
            })
                .catch(function () {
                _this.animator.stop(elem);
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('botaoPerdidos'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "botaoPerdidos", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('botaoAdocao'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "botaoAdocao", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('botaoRegistro'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "botaoRegistro", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/home/yagod/petGree/src/pages/home/home.html"*/`<ion-header no-border>\n    <ion-navbar>\n        <button ion-button icon-only menuToggle>\n          <ion-icon name="person" style="color: white;"></ion-icon>\n        </ion-fab-button>\n        <ion-title>{{titulo}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="masters">\n  <div class="botao-perdidos" #botaoPerdidos (click)="animarBotao(\'perdidos\')">\n      <div class="icon search"></div>\n  </div>\n  <div class="botao-adocao" #botaoAdocao (click)="animarBotao(\'adocao\')">\n    <div class="icon heart"></div>\n  </div>\n  <div class="botao-registro" #botaoRegistro (click)="animarBotao(\'registro\')">\n    <div class="icon paw"></div>\n  </div>\n</ion-content>\n\n<ion-footer no-border>\n    <ion-toolbar>\n      <ion-title>Feito por Yago Dórea</ion-title>\n    </ion-toolbar>\n  </ion-footer>`/*ion-inline-end:"/home/yagod/petGree/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_css_animator__["AnimationService"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagePerdidos; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_insert_pet__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_animations__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modal_show_image__ = __webpack_require__(293);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






function PetJSON(type, gender, size, color, spots, description, image_url) {
    this.type = type;
    this.gender = gender;
    this.size = size;
    this.color = color;
    this.spots = spots;
    this.description = description;
    this.image_url = image_url;
}
var PagePerdidos = /** @class */ (function () {
    function PagePerdidos(http, modalCtrl, alertCtrl) {
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        // sample (in case no server is available)
        this.messageList = [];
        // url = 'http://ec2-18-231-183-70.sa-east-1.compute.amazonaws.com:4242/pets';
        this.url = 'http://localhost:4242/pets';
    }
    PagePerdidos.prototype.changeColor = function (message, number) {
        if (number == 1) {
            message.state = 'red';
            this.deletePet(message);
        }
        else {
            message.state = 'normal';
            this.postPet(message);
        }
    };
    PagePerdidos.prototype.ngOnInit = function () {
        this.getPets();
    };
    PagePerdidos.prototype.getPets = function () {
        var _this = this;
        this.http.get(this.url).subscribe(function (data) {
            console.log(data);
            _this.messageList = data;
            _this.messageList.forEach(function (message) {
                message.state = 'normal';
                message.postString = 'Post';
                if (message.spots)
                    message.spotsTxt = "Sim";
                else
                    message.spotsTxt = "Não";
                if (message.image_url == null)
                    message.image_url = "./assets/imgs/pet1.png";
            });
        }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error occurred.");
            }
            else {
                console.log("Server-side error occurred. Details:\n" + err.message);
            }
        });
    };
    PagePerdidos.prototype.showImage = function (image) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__modal_show_image__["a" /* ModalShowImage */], { image: image });
        modal.present();
    };
    PagePerdidos.prototype.insertPet = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__modal_insert_pet__["a" /* ModalInsertPet */]);
        modal.onDidDismiss(function (data) {
            if (data) {
                var pet = { type: "string", color: "string", gender: "string", size: "string", spots: false, description: "string", image_url: null };
                switch (parseInt(data.gender, 10)) {
                    case 0: {
                        pet.gender = "Macho";
                        break;
                    }
                    case 1: {
                        pet.gender = "Femea";
                        break;
                    }
                    case 2: {
                        pet.gender = "Desconhecido";
                        break;
                    }
                }
                switch (parseInt(data.type, 10)) {
                    case 1: {
                        pet.type = "Cachorro";
                        break;
                    }
                    case 2: {
                        pet.type = "Gato";
                        break;
                    }
                    case 3: {
                        pet.type = "Hamster";
                        break;
                    }
                    case 4: {
                        pet.type = "Coelho";
                        break;
                    }
                    case 5: {
                        pet.type = "Cavalo";
                        break;
                    }
                    case 6: {
                        pet.type = "Lagarto";
                        break;
                    }
                    case 7: {
                        pet.type = "Pássaro";
                        break;
                    }
                    case 8: {
                        pet.type = "Tartaruga";
                        break;
                    }
                    default: {
                        pet.type = "Outro";
                        break;
                    }
                }
                switch (parseInt(data.size, 10)) {
                    case 0: {
                        pet.size = "Pequenino";
                        break;
                    }
                    case 1: {
                        pet.size = "Pequeno";
                        break;
                    }
                    case 2: {
                        pet.size = "Medio";
                        break;
                    }
                    case 3: {
                        pet.size = "Grande";
                        break;
                    }
                    case 4: {
                        pet.size = "Muitogrande";
                        break;
                    }
                    case 5: {
                        pet.size = "Imenso";
                        break;
                    }
                    default: {
                        pet.size = "Outro";
                        break;
                    }
                }
                switch (parseInt(data.color, 10)) {
                    case 0: {
                        pet.color = "Branco";
                        break;
                    }
                    case 1: {
                        pet.color = "Preto";
                        break;
                    }
                    case 2: {
                        pet.color = "Marrom";
                        break;
                    }
                    case 3: {
                        pet.color = "Laranja";
                        break;
                    }
                    case 4: {
                        pet.color = "Malhado";
                        break;
                    }
                    case 5: {
                        pet.color = "Bege";
                        break;
                    }
                    default: {
                        pet.color = "Outro";
                        break;
                    }
                }
                pet.spots = data.spots;
                pet.description = data.description;
                pet.image_url = data.image_url;
                // TODO fazer o fetch do link de upload
                _this.postPet(pet);
            }
        });
        modal.present();
    };
    PagePerdidos.prototype.postPet = function (pet) {
        var _this = this;
        var petVO = new PetJSON(pet.type, pet.gender, pet.size, pet.color, pet.spots, pet.description, pet.image_url);
        console.log("POST:" + this.url + " -d'{type:" + petVO.type + ",gender:" + petVO.gender + ",size:" + petVO.size + ",color:" + petVO.color + ",spots:" + petVO.spots + ",description:" + petVO.description + ",image_url:" + petVO.image_url + "\n");
        this.http.post(this.url, petVO).subscribe(function (data) {
            console.log("POSTADOOO -> " + data);
            _this.getPets();
        });
    };
    PagePerdidos.prototype.deletePet = function (pet) {
        console.log('DELETE' + this.url + '/' + pet.id);
        this.http.delete(this.url + '/' + pet.id).subscribe(function (data) {
            console.log(data);
            pet.postString = 'Repost';
        });
    };
    PagePerdidos = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'perdidos',template:/*ion-inline-start:"/home/yagod/petGree/src/pages/home/perdidos/perdidos.html"*/`<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </ion-fab-button>\n        <ion-title>Animais Perdidos</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content class="masters">\n    <ion-list>\n        <ion-item sliding *ngFor="let pet of messageList" style="background-color: transparent">\n            <ion-card [@colorState]="pet.state">\n                <ion-card-header>\n                    <h1>{{pet.type.description}}</h1>\n                </ion-card-header>\n                <ion-card-content>\n                    <ion-grid style="max-height: 300px;">\n                        <ion-row align-items-center>\n                            <ion-col col-6>\n                                <img src={{pet.image_url}} style="height: 200px; width: auto;" (click)="showImage(pet.image_url)"/>\n                            </ion-col>\n                            <ion-col col-6 >\n                                Sexo: {{pet.gender.description}} <br/>\n                                Tamanho: {{pet.size.description}} <br/>\n                                Cor: {{pet.color.description}} <br/>\n                                Tem manchas? {{pet.spotsTxt}} <br/>\n                                Descrição:<p text-wrap style="text-align: left; color: white;">{{pet.description}}</p>\n                                <br/>\n                                <button ion-button color="danger" (click)="changeColor(pet,1)">Delete</ion-fab-button> <button ion-button (click)="changeColor(pet,0)">{{pet.postString}}</ion-fab-button>\n                            </ion-col>                            \n                        </ion-row>\n                    </ion-grid>\n                </ion-card-content>\n            </ion-card>\n        </ion-item>\n    </ion-list>\n</ion-content>\n\n<ion-footer>\n    <div #fabButton>\n        <ion-fab slot="fixed" right bottom padding="10dp">\n            <ion-fab-button><ion-icon name="paw"></ion-icon></ion-fab-button>\n            <ion-fab slot="fixed"-list side="top">\n                <ion-fab-button (click)="getPets()"><ion-icon name="refresh"></ion-icon></ion-fab-button>\n                <ion-fab-button (click)="insertPet()"><ion-icon name="add"></ion-icon></ion-fab-button>\n            </ion-fab-list>\n        </ion-fab>\n    </div>\n</ion-footer>`/*ion-inline-end:"/home/yagod/petGree/src/pages/home/perdidos/perdidos.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["j" /* trigger */])('colorState', [
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["g" /* state */])('red', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({
                        backgroundColor: "red"
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["g" /* state */])('normal', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({
                        backgroundColor: "#7d5dc3"
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["i" /* transition */])('* => *', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["e" /* animate */])('1000ms ease'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]])
    ], PagePerdidos);
    return PagePerdidos;
}());

//# sourceMappingURL=perdidos.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalInsertPet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase_firebase__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModalInsertPet = /** @class */ (function () {
    function ModalInsertPet(navParams, viewCtrl, camera, loadingCtrl, fireProvider) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.fireProvider = fireProvider;
        this.newPet = { type: "", gender: "", size: "", color: "", description: "", spots: false, image_url: "" };
        this.petImgURL = "./assets/imgs/placeholder.png";
    }
    ModalInsertPet.prototype.takePic = function () {
        var _this = this;
        console.log("takePic()");
        var options = {
            quality: 30,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.loading = _this.loadingCtrl.create({
                content: "Carregando imagem..."
            });
            _this.loading.present();
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.petImage = _this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
            _this.uploadPic();
        }, function (err) {
            // Handle error
        });
    };
    ModalInsertPet.prototype.dataURItoBlob = function (dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    };
    ModalInsertPet.prototype.uploadPic = function () {
        var _this = this;
        var name = '/images/' + new Date() + ".jpg";
        if (this.petImage) {
            var uploadTask = this.fireProvider.storage.upload(name, this.petImage);
            // uploadTask.then(this.onSuccess, this.onError);
            uploadTask
                .then(function (snapshot) {
                _this.loading.dismiss();
                snapshot.ref.getDownloadURL().then(function (url) {
                    _this.petImgURL = url;
                    console.log("Upload com sucesso. url: " + url);
                    _this.newPet.image_url = _this.petImgURL;
                });
            })
                .catch(function (error) {
                console.log("Erro! " + error);
            });
        }
    };
    ModalInsertPet.prototype.closeModal = function () {
        this.newPet.type = this.type;
        this.newPet.gender = this.gender;
        this.newPet.color = this.color;
        this.newPet.size = this.size;
        this.newPet.spots = this.spots;
        this.newPet.description = this.description;
        this.viewCtrl.dismiss(this.newPet);
    };
    ModalInsertPet = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-insertpet-modal',template:/*ion-inline-start:"/home/yagod/petGree/src/pages/home/perdidos/modal-insert-pet.html"*/`\n<ion-header>\n    <ion-toolbar>\n        <ion-title style="text-align: center;">\n            Inserir novo pet\n        </ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="dismiss()">\n                <span ion-text color="primary" showWhen="ios">Cancel</span>\n                <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n            </ion-fab-button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n      \n<ion-content>\n    <!-- <ion-list>\n        <ion-item>\n            <ion-avatar item-start>\n                <img src="{{character.image}}">\n            </ion-avatar>\n            <h2>{{character.name}}</h2>\n            <p>{{character.quote}}</p>\n        </ion-item>\n      \n        <ion-item *ngFor="let item of character[\'items\']">\n            {{item.title}}\n            <ion-note item-end>\n                {{item.note}}\n            </ion-note>\n        </ion-item>\n    </ion-list> -->\n\n    <ion-list inset>\n\n    <ion-grid><ion-row align-items-center>\n        <ion-col col-12 col-sm>\n            <div style="align-items: center;"><img src="{{petImgURL}}" (click)="takePic()"/></div>\n        </ion-col>\n        <ion-col col-12 col-sm>\n        <ion-item>\n            <ion-label>Espécie</ion-label>\n            <ion-select [(ngModel)]="type">\n                <ion-option value=1>Cachorro</ion-option>\n                <ion-option value=2>Gato</ion-option>\n                <ion-option value=3>Hamster</ion-option>\n                <ion-option value=4>Coelho</ion-option>\n                <ion-option value=5>Cavalo</ion-option>\n                <ion-option value=6>Lagarto</ion-option>\n                <ion-option value=7>Pássaro</ion-option>\n                <ion-option value=8>Tartaruga</ion-option>\n                <ion-option value=9>Outro</ion-option>\n            </ion-select>\n        </ion-item>\n        \n        <ion-item>\n            <ion-label>Sexo</ion-label>\n            <ion-select [(ngModel)]="gender">\n                <ion-option value="0">Macho</ion-option>\n                <ion-option value="1">Fêmea</ion-option>\n                <ion-option value="2">Não sei</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Tamanho</ion-label>\n            <ion-select [(ngModel)]="size">\n                <ion-option value="0">Pequenino</ion-option>\n                <ion-option value="1">Pequeno</ion-option>\n                <ion-option value="2">Médio</ion-option>\n                <ion-option value="3">Grande</ion-option>\n                <ion-option value="4">Muito grande</ion-option>\n                <ion-option value="5">Imenso</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Cor</ion-label>\n            <ion-select [(ngModel)]="color">\n                <ion-option value="0">Branco</ion-option>\n                <ion-option value="1">Preto</ion-option>\n                <ion-option value="2">Marrom</ion-option>\n                <ion-option value="3">Laranja</ion-option>\n                <ion-option value="4">Malhado</ion-option>\n                <ion-option value="5">Bege</ion-option>\n                <ion-option value="6">Outro</ion-option>\n            </ion-select>\n        </ion-item>\n        \n        <ion-item>\n            <ion-label>Manchas?</ion-label>\n            <ion-checkbox color="secondary" checked="false" [(ngModel)]="spots"></ion-checkbox>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Descrição adicional</ion-label>\n        </ion-item>\n        <ion-item>\n            <ion-textarea [(ngModel)]="description" placeholder="Diga algo que se destaque nesse animal."></ion-textarea>\n        </ion-item>\n    </ion-col>\n    </ion-row></ion-grid>\n    </ion-list>\n\n    <ion-grid>\n        <ion-row>\n            <ion-col col-6><button ion-button block (click)="closeModal()">Inserir</ion-fab-button></ion-col>\n            <ion-col col-6><button ion-button block (click)="this.viewCtrl.dismiss()">Cancelar</ion-fab-button></ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>`/*ion-inline-end:"/home/yagod/petGree/src/pages/home/perdidos/modal-insert-pet.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_firebase_firebase__["a" /* FirebaseProvider */]])
    ], ModalInsertPet);
    return ModalInsertPet;
}());

//# sourceMappingURL=modal-insert-pet.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalShowImage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ModalShowImage = /** @class */ (function () {
    function ModalShowImage(navParams, viewCtrl, loadingCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.imageUrl = navParams.get('image');
    }
    ModalShowImage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    ModalShowImage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-showimage-modal',template:/*ion-inline-start:"/home/yagod/petGree/src/pages/home/perdidos/modal-show-image.html"*/`<ion-header>\n</ion-header>\n\n<ion-content text-center style="background: transparent;" padding>\n    <ion-img [src]="imageUrl" (click)="closeModal()" style="width: 100%; height: 100%; background: transparent; align-items: center;" no-padding no-margin></ion-img>\n</ion-content>`/*ion-inline-end:"/home/yagod/petGree/src/pages/home/perdidos/modal-show-image.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], ModalShowImage);
    return ModalShowImage;
}());

//# sourceMappingURL=modal-show-image.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(408);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_css_animator__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_css_animator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_css_animator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_perdidos_modal_insert_pet__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_modal_login__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_modal_signup__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_perdidos_modal_show_image__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_home_perdidos_perdidos__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_adocao_adocao__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2_firestore__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2_storage__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2_auth__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_firebase_firebase__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















// Firebase modules
// import { AngularFireDatabaseModule } from 'angularfire2/database';





var firebaseConfig = {
    apiKey: "AIzaSyA3NSMbfS7Gwcd0S2LZQwnfvUSgazwCvYc",
    authDomain: "petgree-app.firebaseapp.com",
    databaseURL: "https://petgree-app.firebaseio.com",
    projectId: "petgree-app",
    storageBucket: "petgree-app.appspot.com",
    messagingSenderId: "806791357162"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_perdidos_modal_insert_pet__["a" /* ModalInsertPet */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_modal_login__["a" /* ModalLogin */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_modal_signup__["a" /* ModalSignup */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_perdidos_modal_show_image__["a" /* ModalShowImage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_perdidos_perdidos__["a" /* PagePerdidos */],
                __WEBPACK_IMPORTED_MODULE_16__pages_adocao_adocao__["a" /* AdocaoPage */],
                __WEBPACK_IMPORTED_MODULE_10_css_animator__["AnimatesDirective"]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/adocao/adocao.module#AdocaoPageModule', name: 'AdocaoPage', segment: 'adocao', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                // AngularFireDatabaseModule,
                __WEBPACK_IMPORTED_MODULE_18_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_19_angularfire2_storage__["b" /* AngularFireStorageModule */],
                __WEBPACK_IMPORTED_MODULE_20_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_17_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig)
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_perdidos_modal_insert_pet__["a" /* ModalInsertPet */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_modal_login__["a" /* ModalLogin */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_modal_signup__["a" /* ModalSignup */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_perdidos_modal_show_image__["a" /* ModalShowImage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_perdidos_perdidos__["a" /* PagePerdidos */],
                __WEBPACK_IMPORTED_MODULE_16__pages_adocao_adocao__["a" /* AdocaoPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_10_css_animator__["AnimationService"],
                __WEBPACK_IMPORTED_MODULE_21__providers_firebase_firebase__["a" /* FirebaseProvider */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicErrorHandler */] },
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_modal_login__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_firebase_firebase__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, modalCtrl, fire, storage, loadingCtrl) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.modalCtrl = modalCtrl;
        this.fire = fire;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
        // login with current saved credentials
        storage.get("credentials")
            .then(function (data) {
            if (data) {
                var credentials = {
                    email: data.email,
                    password: data.password
                };
                console.log("credentials:\nemail -> " + credentials.email + "\npassword -> " + credentials.password);
                _this.fire.signInWithEmail(credentials);
            }
            else
                console.log("data is null");
        });
        this.fire.auth.authState.subscribe(function (user) { return _this.updateUserInfo(); });
        console.log('loggedIn: ' + this.loggedIn);
        console.log('myEmail: ' + this.myEmail);
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.openLogin = function () {
        var _this = this;
        console.log('Opening login modal');
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_home_modal_login__["a" /* ModalLogin */]);
        modal.onDidDismiss(function (data) {
            _this.storage.set("credentials", data);
            console.log('login dismissed');
            _this.updateUserInfo();
        });
        modal.present();
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: "Saindo..."
        });
        this.loading.present();
        console.log('logout');
        this.fire.signOut()
            .then(function (data) {
            console.log(data);
            _this.storage.remove("credentials");
            _this.updateUserInfo();
            _this.loading.dismiss();
        })
            .catch(function (error) { return console.log('Error: ' + error.message); });
    };
    MyApp.prototype.updateUserInfo = function () {
        this.loggedIn = this.fire.authenticated;
        this.myEmail = this.fire.getEmail();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/yagod/petGree/src/app/app.html"*/`<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Perfil</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-row *ngIf="!loggedIn" align-items-center>\n      <ion-col col-12><button ion-button menuClose block (click)="openLogin()">Entrar</ion-fab-button></ion-col>\n    </ion-row>\n    <ion-row *ngIf="loggedIn" align-items-center>\n      <ion-col col-12>Logado como {{myEmail}}</ion-col>\n      <h1>Disponibilizar aqui depois um avatar do usuário e o logo do aplicativo.</h1>\n    </ion-row>\n    <ion-row *ngIf="loggedIn" align-items-center>\n      <ion-col col-12><button ion-button menuClose block (click)="logout()">Sair</ion-fab-button></ion-col>\n    </ion-row>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n`/*ion-inline-end:"/home/yagod/petGree/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_firebase_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_storage__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(237);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FirebaseProvider = /** @class */ (function () {
    function FirebaseProvider(afs, storage, auth) {
        this.afs = afs;
        this.storage = storage;
        this.auth = auth;
    }
    //  FIRESTORE DATABASE
    FirebaseProvider.prototype.getItems = function () {
        return this.afs.collection('/items');
        // return this.afd.list('/items/');
    };
    FirebaseProvider.prototype.addItem = function (item) {
        this.afs.collection('/items').add({ data: item })
            .then(function () { console.log("item written."); })
            .catch(function (error) { console.log("error:" + error); });
        // this.afd.list('/items/').push(item);
    };
    FirebaseProvider.prototype.removeItem = function (item) {
        this.afs.collection('/items').doc(item).delete();
    };
    //  FIREBASE STORAGE
    FirebaseProvider.prototype.getURL = function () {
        return this.storage.ref('pet3.png').getDownloadURL();
    };
    //  FIREBASE AUTH
    FirebaseProvider.prototype.signInWithEmail = function (credentials) {
        console.log('Sign in with email');
        return this.auth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    };
    FirebaseProvider.prototype.signOut = function () {
        return this.auth.auth.signOut();
    };
    FirebaseProvider.prototype.signUp = function (credentials) {
        console.log('Sign up');
        return this.auth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    };
    Object.defineProperty(FirebaseProvider.prototype, "authenticated", {
        get: function () {
            return (this.auth.auth.currentUser !== null);
        },
        enumerable: true,
        configurable: true
    });
    FirebaseProvider.prototype.getEmail = function () {
        if (this.auth.auth.currentUser) {
            console.log("Email: " + this.auth.auth.currentUser.email);
            return this.auth.auth.currentUser.email;
        }
        else {
            console.log("Email not set");
            return null;
        }
    };
    FirebaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_storage__["a" /* AngularFireStorage */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], FirebaseProvider);
    return FirebaseProvider;
}());

//# sourceMappingURL=firebase.js.map

/***/ })

},[294]);
//# sourceMappingURL=main.js.map
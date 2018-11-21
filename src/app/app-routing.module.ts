import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'login', component: LoginComponent },
  { path: 'suporte', loadChildren: './suporte/suporte.module#SuportePageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'resultados', loadChildren: './resultados/resultados.module#ResultadosPageModule' },
  { path: 'perfil-user/:id', loadChildren: './perfil-user/perfil-user.module#PerfilUserPageModule' },
  { path: 'perfil-user/', redirectTo: 'home', pathMatch: 'full'},
  { path: 'perfil-user-edit', loadChildren: './perfil-user-edit/perfil-user-edit.module#PerfilUserEditPageModule' },
  { path: 'perfil-pet/:id' , loadChildren: './perfil-pet/perfil-pet.module#PerfilPetPageModule' },
  { path: 'perfil-pet/', redirectTo: 'home', pathMatch: 'full'},
  { path: 'perfil-pet-edit', loadChildren: './perfil-pet-edit/perfil-pet-edit.module#PerfilPetEditPageModule' },
  { path: 'meus-pets', loadChildren: './meus-pets/meus-pets.module#MeusPetsPageModule' },
  { path: 'functions', loadChildren: './functions/functions.module#FunctionsPageModule' },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'EditColorsModal', loadChildren: './edit-colors-modal/edit-colors-modal.module#EditColorsModalPageModule' },
  { path: 'EditAddressModal', loadChildren: './edit-address-modal/edit-address-modal.module#EditAddressModalPageModule' },
  { path: 'EditPhonesModal', loadChildren: './edit-phones-modal/edit-phones-modal.module#EditPhonesModalPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

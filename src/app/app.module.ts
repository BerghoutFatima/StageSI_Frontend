import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { AngularFireAuthModule } from '@angular/fire/auth'
import { AppComponent } from './app.component';
//import { AppRoutingModule } from './app-routing.module';
//import { AngularFireDatabaseModule } from '@angular/fire/database';
import firebaseConfig from './firebase';
//import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireModule } from '@angular/fire';
import { UploadComponent } from './upload/upload.component';

import { AboutComponent } from './about/about.component';

import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';

import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { DeposerComponent } from './deposer/deposer.component';

import { EspacesComponent } from './espaces/espaces.component';

import { EvaluerComponent } from './evaluer/evaluer.component';

import { HomeComponent } from './home/home.component';

import { EspacesCPFComponent } from './espaces-cpf/espaces-cpf.component';

import { ValiderRejetterComponent } from './valider-rejetter/valider-rejetter.component';

import { NotificationsCpfComponent } from './notifications-cpf/notifications-cpf.component';

import { HomeCPFComponent } from './home-cpf/home-cpf.component';

import { HomeEtudiantComponent } from './home-etudiant/home-etudiant.component';

import { CommentairesComponent } from './commentaires/commentaires.component';

import { CommentairesEtudiantComponent } from './commentaires-etudiant/commentaires-etudiant.component';

import { ProposerProjetComponent } from './proposer-projet/proposer-projet.component';

import { ProposerProjetCpfComponent } from './proposer-projet-cpf/proposer-projet-cpf.component';

import { DetailsPrjComponent } from './details-prj/details-prj.component';

import { DetailsEtudiantComponent } from './details-etudiant/details-etudiant.component';

import { DetailsPrjCpfComponent } from './details-prj-cpf/details-prj-cpf.component';

import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { ProjetsService } from './services/projets.service';

import { FormsModule } from '@angular/forms';

//appRoutes est un tableau d'objets de type Routes qui contients les routes de navigation de l'app

const appRoutes:Routes=[
     {path: 'about',component: AboutComponent},
     {path: 'upload/:id/:username',component: UploadComponent},
     {path: 'about/:username',component: AboutComponent},
     {path: 'evaluer/:id/:username',component: EvaluerComponent},
     {path: 'signup',component: SignupComponent},
     {path: 'login',component: LoginComponent},
     {path: 'espaces',component: EspacesComponent },
     {path: 'espaces/:username',component: EspacesComponent },
     {path: 'reset-password',component: ResetPasswordComponent },
     {path: 'deposer',component: DeposerComponent },
     {path: 'deposer/:username',component: DeposerComponent },
     {path: 'espaces-cpf',component: EspacesCPFComponent },
     {path: 'espaces-cpf/:username',component: EspacesCPFComponent },
     {path: 'proposer-projet',component: ProposerProjetComponent},
     {path: 'proposer-projet/:laclasse/:username',component: ProposerProjetComponent},
     {path: 'proposer-projet-cpf',component: ProposerProjetCpfComponent},
     {path: 'proposer-projet-cpf/:laclasse/:username',component: ProposerProjetCpfComponent},
     {path: 'details-projet',component: DetailsPrjComponent},
     {path: 'details-projet/:id/:username',component: DetailsPrjComponent},
     {path: 'details-etudiant',component: DetailsEtudiantComponent},
     {path: 'details-etudiant/:id/:username',component: DetailsEtudiantComponent},
     {path: 'details-projet-cpf',component: DetailsPrjCpfComponent},
     {path: 'details-projet-cpf/:id/:username',component: DetailsPrjCpfComponent},
     {path: 'details-prj-cpf',component: DetailsPrjCpfComponent},
     {path: 'details-prj-cpf/:id/:username',component: DetailsPrjCpfComponent},
     {path: 'valider-rejetter',component: ValiderRejetterComponent},
     {path: 'valider-rejetter/:id/:username',component: ValiderRejetterComponent},
     {path: 'home',component: HomeComponent},
     {path: 'home/:laclasse/:username',component: HomeComponent},
     {path: 'home-etudiant',component: HomeEtudiantComponent},
     {path: 'home-etudiant/:username',component: HomeEtudiantComponent},
     {path: 'home-cpf',component: HomeCPFComponent},
     {path: 'home-cpf/:laclasse/:username',component: HomeCPFComponent},
     {path: 'commentaires',component: CommentairesComponent},
     {path: 'commentaires/:id/:username',component: CommentairesComponent},
     {path: 'commentaires-etudiant',component: CommentairesEtudiantComponent},
     {path: 'commentaires-etudiant/:id/:username',component: CommentairesEtudiantComponent},
     {path: 'notifications-cpf',component: NotificationsCpfComponent},
     {path: 'notifications-cpf/:laclasse/:username',component: NotificationsCpfComponent},
     {path: '',
      redirectTo: '/login',
      pathMatch: 'full'
     }
];

@NgModule({
  declarations: [AppComponent,EvaluerComponent,UploadComponent,ResetPasswordComponent,SignupComponent,LoginComponent, DeposerComponent,CommentairesEtudiantComponent, DetailsEtudiantComponent,HomeEtudiantComponent,AboutComponent,EspacesCPFComponent,ProposerProjetComponent,DetailsPrjComponent,HomeComponent,HomeCPFComponent, DetailsPrjCpfComponent, EspacesComponent ,ProposerProjetCpfComponent, NotificationsCpfComponent,ValiderRejetterComponent,CommentairesComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    //AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    //AngularFireAuthModule,
    //AngularFirestoreModule,
    //AngularFireDatabaseModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //AngularFirestoreModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProjetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

  
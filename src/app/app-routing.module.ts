import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

export class AppComponent {
  Menu : any;
  constructor(private platform    : Platform,
              private splashScreen: SplashScreen,
              private statusBar   : StatusBar) 
  {
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
const routes: Routes = [
  /*{
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },*/
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  /*{
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  
  {
    path: 'home-etudiant',
    loadChildren: () => import('./home-etudiant/home-etudiant.module').then( m => m.HomeEtudiantPageModule)
  },
  
  {
    path: 'details-etudiant',
    loadChildren: () => import('./details-etudiant/details-etudiant.module').then( m => m.DetailsEtudiantPageModule)
  },*/
  
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  /*{
    path: 'notifications-cpf',
    loadChildren: () => import('./notifications-cpf/notifications-cpf.module').then( m => m.NotificationsCpfPageModule)
  },*/
  {
    path: 'notifications-etudiant',
    loadChildren: () => import('./notifications-etudiant/notifications-etudiant.module').then( m => m.NotificationsEtudiantPageModule)
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

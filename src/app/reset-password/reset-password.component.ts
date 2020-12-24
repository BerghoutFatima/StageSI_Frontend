import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';

export class User {
  email: string;
  password: string;
  
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  
  public user:User = new User();
  constructor(
    public router: Router, 
    //public fAuth: AngularFireAuth,
    private alertCtrl: AlertController){}

   

  ngOnInit() {
  }

  async resetPassword(email:string) {
  
    /*return this.fAuth.auth.sendPasswordResetEmail(this.user.email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log())*/
      
  }

  //reinitialiser le mot de passe
  async reset_Password():Promise<void>{
    
    this.resetPassword(this.user.email).then(
      
      async() =>{
        const alert = await this.alertCtrl.create({
          message: "Un lien de réinitialisation a été envoyé vers votre boite e-mail",
          buttons: [{ text: "Ok", role: 'cancel', handler: () => {
                this.router.navigate(['/login']);
              }
            }],
      });
      await alert.present();
      },

      async error => {
        const errorAlert = await this.alertCtrl.create({
          header: 'Erreur!',
          message: "Email incorrecte",
          buttons: [{ text: "Ok", role: 'cancel'}],
      });
      console.log(this.user.email)
      console.log(error.message)
      await errorAlert.present();
      }
      );
    }

}

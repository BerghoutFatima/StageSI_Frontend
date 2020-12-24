import { Component, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';
//import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
//import { AngularFirestore } from '@angular/fire/firestore'
import { ToastController } from '@ionic/angular';
import { Etudiant } from 'src/model/model.etudiant';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';

/*export class User {
    email: string;
    password: string;
}*/



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  private pageEtudiants:any;
  //public user:User = new User();
  // res:Etudiant[]=[];

  public etudiant:Etudiant = new Etudiant();

  showPassword = false;

  passwordToggleIcon ='eye';

  constructor(
	  public navCtrl: NavController,
	  //public fAuth: AngularFireAuth,
	  public router: Router,
	  //public afAuth: AngularFireAuth,
	  //public afstore: AngularFirestore,
	  private toastController: ToastController,
	  private http: HttpClient,
	  private dataservice:DataService
    ){}
    
    ngOnInit() {
      /*console.log("----------");
	  this.dataservice.findEtudiantsByUsername("safa").subscribe(data=>{
      console.log(data);
      this.pageEtudiants=data;
      console.log("----------");
      
      console.log(this.pageEtudiants);
      console.log("----------");

  });*/
}

  

	togglePassword(): void {
			this.showPassword =!this.showPassword;
			if(this.passwordToggleIcon=='eye'){
				this.passwordToggleIcon ='eye-off';
			}
			else {
				this.passwordToggleIcon ='eye';
			}
		}
  async signup() {
   
    try {
      this.dataservice.getEtudiantViaHttp(this.etudiant.username, this.etudiant.email).subscribe(data=>{
        //console.log("eeeee");
        console.log(data);
        this.pageEtudiants=data;
        console.log(this.pageEtudiants.length);
        //console.log("eeeee");
        if(this.pageEtudiants.length==0)
        {
          this.addUser();
      console.log("Successfully registered!");
      this.toaster("Inscription réussite "+this.etudiant.username+ " !");
      this.router.navigate(['/login'])
      
    }
    else this.toaster("Cet identifiant ou cet email est déja utilisé !");
  });
	  
    

    } catch (err) {
	  let toast = await this.toastController.create({
		message: 'Votre identifiant ou votre email est déja utilisé',
		duration: 2000,
		position: 'bottom'
	  });
	  await toast.present();
	  return console.error("Mots de passe invalides")
    }


  }
  
async toaster(mssg:string){

  let toast = await this.toastController.create({
    message: mssg,
    duration: 2000,
    position: 'bottom'
    });
    await toast.present();
    
}

  addUser(){
    console.log(this.etudiant);
    this.dataservice.addUserViaHttp(this.etudiant)
        .subscribe(data=>{
            console.log(data);
            this.router.navigate(['/login'])

        },err=>{
            console.log(JSON.parse(err._body).message);
        })
  }

  Getselected($event) {
    console.log("selected value : ", $event.target.value)
    return $event.target.value;
  }

}

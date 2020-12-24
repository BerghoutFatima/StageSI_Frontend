import { Component , OnInit} from '@angular/core';
import {  NavController } from '@ionic/angular';
/////import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from "../services/data.service";
import { Etudiant } from 'src/model/model.etudiant';

export class User {
    email: string;
    password: string;
    
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public pageEtudiants:any;
  showPassword = false;
  passwordToggleIcon ='eye';
  currentDate: string;
  public user:User = new User();
  public etudiant:Etudiant = new Etudiant();
  
  

  constructor(
    public navCtrl: NavController, 
    /////public fAuth: AngularFireAuth, 
    public router: Router, 
    private toastController: ToastController,
    private dataservice: DataService,
    ) { 
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    
    
  }

  ngOnInit() {}
  
  //afficher ou masquer le pwd
  togglePassword(): void {
    this.showPassword =!this.showPassword;
    if(this.passwordToggleIcon=='eye'){
      this.passwordToggleIcon ='eye-off';
    }
    else {
      this.passwordToggleIcon ='eye';
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

  async login() {
    try {
      
        this.dataservice.loginEtudiantViaHttp(this.etudiant.email, this.etudiant.password).subscribe(data=>{
        
        this.pageEtudiants=data;
        if (this.etudiant.email === "anasrghioui@gmail.com" && this.etudiant.password === this.pageEtudiants[0].password){
          
          this.router.navigate(['/espaces',this.pageEtudiants[0].username]);
          this.toaster(this.etudiant.username+" bienvenue dans votre espace professoral!");
          
          
        }else {
              if (this.etudiant.email === "cpf@gmail.com" && this.etudiant.password === this.pageEtudiants[0].password)
              {
                this.router.navigate(['/espaces-cpf',this.pageEtudiants[0].username]);
                this.toaster(this.etudiant.username+" bienvenue dans votre espace CPF");
                   
                   
            }
            else {
                 this.dataservice.loginEtudiantViaHttp(this.etudiant.email, this.etudiant.password).subscribe(data=>{
                 
                 this.pageEtudiants=data;
                
                 if(this.pageEtudiants.length === 1 && this.etudiant.email===this.pageEtudiants[0].email && this.etudiant.password===this.pageEtudiants[0].password)
                 {
                  this.toaster(this.pageEtudiants[0].username+" bienvenue dans votre espace estudiantin");
                  this.router.navigate(['/home-etudiant',this.pageEtudiants[0].username]);
 
                 }
                 else{
                   this.toaster("Authentification échouée ou vous n\'etes pas encore inscris")
            }
              });
                }}
              });
            
          
        
      
      

    } catch (err) {
      console.error(err);
        let toast = await this.toastController.create({
          message: 'Authentification échouée',
          duration: 2000,
          position: 'bottom'
          });
          await toast.present();
    }
  }
}

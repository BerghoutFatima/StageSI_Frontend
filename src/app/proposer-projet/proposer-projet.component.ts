import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/model/model.projet';
import { ProjetsService } from '../services/projets.service';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Etudiant } from 'src/model/model.etudiant';


@Component({
  selector: 'app-proposer-projet',
  templateUrl: './proposer-projet.component.html',
  styleUrls: ['./proposer-projet.component.scss'],
})
export class ProposerProjetComponent implements OnInit {
  private pageEtudiants:any;
  projet:Projet=new Projet();
  private prjt:any;
  selectedStudents:string[]=[];
  username:string;
  private etudiant:any;
  etd = new Etudiant();

  constructor(public alertController: AlertController,public router: Router,private projetservice:ProjetsService, private dataservice:DataService, private activatedRoute:ActivatedRoute) {
    console.log(this.activatedRoute.snapshot.paramMap.get('username'));
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.dataservice.findEtudiantsByUsername(this.username).subscribe(data=>{
      this.etudiant=data;
      console.log(data);
      this.etd = this.etudiant;
    },err=>{
      console.log(err);
   })
  }

  ngOnInit() {
  }

  goBack(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    const laclasse=this.activatedRoute.snapshot.paramMap.get('laclasse');
    this.router.navigate(['/home',laclasse,this.username]);
  }
  async proposerProjet(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    const laclasse=this.activatedRoute.snapshot.paramMap.get('laclasse');
    this.projet.laclasse=laclasse;
    console.log("this.projet");
    console.log(this.projet);
    this.projetservice.proposerProjetViaHttp(this.projet)
        .subscribe(data=>{
            console.log("data");
            console.log(data);
            
        },err=>{
            console.log(JSON.parse(err._body).message);
        })
        const alert = await this.alertController.create({
          header: 'Proposer un sujet',
          message:'<string>Votre proposition va être traité par le CPF.<br><br> voulez vous proposre un autre sujet?</strong>',
          buttons: [{
            text: 'Non',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel'); 
              this.router.navigate(['/home',laclasse,this.username]);       
            }     
          },
        {
          text: 'Oui',
          handler: () => {
            console.log('Confirm OK');
          }
        }
      ]
        });
        await alert.present();
  }
  

  listerEtudiants(){
    const laclasse = this.activatedRoute.snapshot.paramMap.get('laclasse');
    this.dataservice.listerEtudiantsViaHttp(laclasse)
             .subscribe(data=>{
              this.pageEtudiants=data;
              for(var i = 0; i < this.pageEtudiants.length; i++){
                   this.pageEtudiants[i]=this.pageEtudiants[i].username;
                  }
                  console.log(this.pageEtudiants);
             },err=>{
              console.log(JSON.parse(err._body).message);
             })
  }
}




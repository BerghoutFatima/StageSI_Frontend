import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from 'src/model/model.projet';
import { Router } from '@angular/router';
import { ProjetsService } from '../services/projets.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
  
@Component({
  selector: 'app-valider-rejetter',
  templateUrl: './valider-rejetter.component.html',
  styleUrls: ['./valider-rejetter.component.scss'],
})
export class ValiderRejetterComponent implements OnInit {
  listeDesMembres:string[]=[];
  livrables:string[]=[];
  taches:string[]=[];
  commentaires: string[]=[];
  username:string;
    
  
    private projet:any;
    prjt = new Projet();
    idProjet:number;
    laclasse:String;
  
    constructor(
      private http:HttpClient, 
      private projetservice:ProjetsService, 
      private activatedRoute:ActivatedRoute,
      public router: Router,
      public alertController:AlertController) 
      {
  
      console.log(activatedRoute.snapshot.params['id']);
      this.idProjet=activatedRoute.snapshot.params['id'];
      
  }
  async rejetter(p:Projet){
    
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
      const alert = await this.alertController.create({
        header: 'Rejeter un sujet',
        message:'<string>Voulez-vous supprimer ce sujet?</strong>',
        buttons: [{
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel'); 
                  
          }     
        },
      {
        text: 'Oui',
        handler: () => {
          console.log('Confirm OK');
          this.projetservice.supprimerProjetViaHttp(p.id)
          .subscribe(data=>{
            
            this.router.navigate(['/notifications-cpf',p.laclasse,this.username]);
            
        },err=>{
            console.log(err);
        })
        }
      }
    ]
      });
      await alert.present();   
  }

  valider(){
    this.prjt=this.projet;
    this.prjt.status = 1;
    console.log(this.prjt);
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.projetservice.upDateProjetViaHttp(this.prjt)
          .subscribe(data=>{
                   console.log(data);
                   this.router.navigate(['/notifications-cpf',this.projet.laclasse,this.username]);
               },err=>{
                   console.log(JSON.parse(err._body).message);
               })
  }

    goBack(){
      this.username=this.activatedRoute.snapshot.paramMap.get('username');
      this.projetservice.detailsProjetViaHttp(this.idProjet)
          .subscribe(data=>{
                   console.log(data);
                   this.projet=data;
                   console.log(this.projet.laclasse);
    })
      this.router.navigate(['/notifications-cpf',this.projet.laclasse,this.username]);
    }

    ngOnInit() {
      this.projetservice.detailsProjetViaHttp(this.idProjet)
          .subscribe(data=>{
                   console.log(data);
                   this.projet=data;
                   this.listeDesMembres=this.projet.listeDesMembres;
                   this.livrables=this.projet.livrables;
                   this.taches=this.projet.taches;
                   this.commentaires=this.projet.commentaires;
               },err=>{
                   console.log(JSON.parse(err._body).message);
               })
    }
  
  }

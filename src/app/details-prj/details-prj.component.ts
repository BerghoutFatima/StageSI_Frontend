import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from 'src/model/model.projet';
import { Router } from '@angular/router';
import { ProjetsService } from '../services/projets.service';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/model/model.etudiant';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-details-prj',
    templateUrl: './details-prj.component.html',
    styleUrls: ['./details-prj.component.scss'],
  })
  
export class DetailsPrjComponent implements OnInit {
  listeDesMembres:string[]=[];
  livrables:string[]=[];
  taches:string[]=[];
  commentaires: string[]=[];
  username:string;
  showComment=false
  comment:string;

    private projet:any;
    private prjt = new Projet();
    private etudiant:any;
  etd = new Etudiant();
    idProjet:number;
    idPrjt:Number;
    note:number;
    showEvaluate=false
  
    constructor(
      private http:HttpClient, 
      private projetservice:ProjetsService, 
      private activatedRoute:ActivatedRoute,
      public router: Router,
      private dataservice: DataService,
      public alertController: AlertController,
      private toastController: ToastController,) 
      {
  
      console.log(activatedRoute.snapshot.params['id']);
      this.idProjet=activatedRoute.snapshot.params['id'];
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

    goBack(){
      this.username=this.activatedRoute.snapshot.paramMap.get('username');
      this.projetservice.detailsProjetViaHttp(this.idProjet)
          .subscribe(data=>{
                   console.log(data);
                   this.projet=data;
                   console.log(this.projet.laclasse);
    })
      this.router.navigate(['/home',this.projet.laclasse,this.username]);
    }

    showComments(enable: boolean) {
      this.showComment = enable
   
    }
    
    onComment(id:Number){
      /*this.username=this.activatedRoute.snapshot.paramMap.get('username');
      this.idPrjt=this.activatedRoute.snapshot.params['id'];
      this.router.navigate(['/commentaires',this.idPrjt,this.username]);*/
      this.prjt=this.projet;
      console.log(this.prjt);
      this.projet.commentaires.push(this.username+":"+this.comment);
      this.projetservice.upDateProjetViaHttp(this.prjt)
      .subscribe(data => {
        console.log(data);
      },err=>{
        console.log(err);
      })
      this.showComment=false
    }

    async toaster(mssg:string){

      let toast = await this.toastController.create({
        message: mssg,
        duration: 2000,
        position: 'bottom'
        });
        await toast.present();
        
    }

  async  onEvaluate(id:number){
      /*this.idPrjt=this.activatedRoute.snapshot.params['id'];
      this.username=this.activatedRoute.snapshot.paramMap.get('username');
      this.router.navigate(['/evaluer',this.idPrjt,this.username]);*/

      this.username=this.activatedRoute.snapshot.paramMap.get('username');
       this.prjt.note=0;
       this.prjt=this.projet;
       const idP=this.activatedRoute.snapshot.paramMap.get('id');
       const converted_note = this.note;
       console.log(converted_note);
       //console.log(this.projet.notes);
       
       this.projet.note=converted_note;
       if(converted_note >= 11)
       {
       this.projet.status=2;
      }
      else this.projet.status=1;
       this.projetservice.upDateProjetViaHttp(this.prjt)
              .subscribe(data => {
                console.log("#########")
                    console.log(data);
                    console.log(this.prjt.note);
                    //alert("note enregistrée !");

              },err=>{
                    //alert("probleme !");
                    console.log(err);
              })

       const alert = await this.alertController.create({
             cssClass: 'my-custom-class',
             header: 'Evaluation',

             message: 'Confirmez-vous cette note ?',

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
                         this.projetservice.detailsProjetViaHttp(this.idProjet)
                           .subscribe(data=>{
                           this.projet=data;
                            })
                            this.router.navigate(['/home',this.projet.laclasse,this.username]);
                       }
                     }
             ]
           });

       await alert.present();
       this.showEvaluate = false
    }
    
    showEvaluates(enable: boolean) {
      this.showEvaluate = enable
   
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
                   //for(var i = 0; i < this.projet.livrables.length; i++){
                   //console.log(this.livrables[i]);}
                   //for(var i = 0; i < this.projet.listeDesMembres.length; i++){
                    //console.log(this.projet.listeDesMembres[i].username);
                  //}
                   //console.log(this.etudiants);
               },err=>{
                   console.log(JSON.parse(err._body).message);
               })
    }
  
  }
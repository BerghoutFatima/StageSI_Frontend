import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjetsService } from '../services/projets.service';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/model/model.etudiant';
import { Projet } from 'src/model/model.projet';


@Component({
  selector: 'app-home-etudiant',
  templateUrl: './home-etudiant.component.html',
  styleUrls: ['./home-etudiant.component.scss'],
})
export class HomeEtudiantComponent implements OnInit {
  private pageProjets:any;
  private pageProjetsEtudiant:Projet [] ;
  private etudiant:any;
  etd = new Etudiant();
  motCle: string = "";
  page:number=0;
  size:number=5;
  pages:Array<number>;
  username:string;
  

  constructor(
    public router: Router,
    public alertController: AlertController,
    private dataService: DataService,
    private http:HttpClient, 
    private projetservice:ProjetsService,
    private activatedRoute:ActivatedRoute,
    private dataservice: DataService,
     ) 
     {
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
    this.afficherProjets();
    
  }

  doSearch(){
    //chercher dans la liste de tous les projets disponibles sous entendu tous les niveaux
    this.projetservice.getProjectFromAllViaHttp(this.motCle).subscribe(data=>{
       this.pageProjets=data;
    },err=>{
       console.log(err);
    })
  }
  goToAbout(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/about',this.username]);
  }

  afficherProjets(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.projetservice.allProjectsValidesByHttp()
         .subscribe(data=>{
            this.pageProjets=data;
            this.pageProjetsEtudiant=[];
            for(var i=0 ; i < this.pageProjets.length ; i++)
            {
              for(var j=0 ; j < this.pageProjets[i].listeDesMembres.length ; j++)
              {
                if(this.pageProjets[i].listeDesMembres[j] === this.username )
                {
                  this.pageProjetsEtudiant.push(this.pageProjets[i])
                }
              }
              
            }
            console.log("aaaaaaaaa")
            console.log(this.pageProjetsEtudiant);
            console.log("aaaaaaaaa")
            //la pagination
            this.pages=new Array(data['totalPages']);
         },err=>{
          console.log("aaaaaaaaa")
            console.log(err);
         })
        }

onShowDetails(id:number){
  this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/details-etudiant',id,this.username]);
  }
  
  onShowAdd(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/deposer',this.username]);
  }

  async LogoutDialog(){
    const alert = await this.alertController.create({
      header: 'Déconnecter',
      message:'<string>Voulez-vous déconnecter ?</strong>',
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
        this.router.navigate(['/login'])
      }
    }
  ]
    });
    await alert.present();
  }

}





  











  


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
  selector: 'app-deposer',
  templateUrl: './deposer.component.html',
  styleUrls: ['./deposer.component.scss'],
})
export class DeposerComponent implements OnInit {
  private pageProjets:any;
  private pageProjetsEtudiant:Projet [] ;
  private etudiant:any;
  etd = new Etudiant();
  motCle: string = "";
  page:number=0;
  size:number=5;
  pages:Array<number>;
  public items: any;
  username:string;
  idProjet:Number;


  

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

  goToAbout(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/about',this.username]);
  }
  upload(id:Number){
    this.idProjet=this.activatedRoute.snapshot.params['id'];
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/upload',id,this.username]);
  }

  doSearch(){
    //chercher dans la liste de tous les projets disponibles sous entendu tous les niveaux
    this.projetservice.getProjectFromAllViaHttp(this.motCle).subscribe(data=>{
       this.pageProjets=data;
    },err=>{
       console.log(err);
    })
  }

  afficherProjets(){
          this.username=this.activatedRoute.snapshot.paramMap.get('username');
          this.projetservice.allProjectsEtudiantValidesByHttp()
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
                  console.log(this.pageProjetsEtudiant);
               },err=>{
                  console.log(err);
               })
              }

  
  onShowDetails(id:number){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
      this.router.navigate(['/details-etudiant',id,this.username]);
    }
  onShowAdd(){
    this.router.navigate(['/deposer']);
  }

  goBack(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/home-etudiant',this.username]);
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

















  











  



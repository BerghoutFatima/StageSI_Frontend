import { Component , OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjetsService } from '../services/projets.service';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/model/model.etudiant';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private pageProjets:any;
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
    console.log(this.activatedRoute.snapshot.paramMap.get('laclasse'));
      const laclasse = this.activatedRoute.snapshot.paramMap.get('laclasse');
      this.listerProjets(laclasse);
  }

  doSearch(classe:string){
    this.projetservice.getProjectViaHttp(this.motCle,classe).subscribe(data=>{
       this.pageProjets=data;
    },err=>{
       console.log(err);
    })
  }

  chercher(laclasse:string){
    laclasse = this.activatedRoute.snapshot.paramMap.get('laclasse');
    this.doSearch(laclasse);
  }
 
  afficherProjets(laclasse:string){
       this.projetservice.listerProjetsViaHttp(laclasse)
            .subscribe(data=>{
               this.pageProjets=data;
               //la pagination
               this.pages=new Array(data['totalPages']);
               
            },err=>{
               console.log(err);
            })
  }
  listerProjets(laclasse:string){
      this.afficherProjets(laclasse);
  }

  onShowDetails(id:number){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/details-projet',id,this.username]);
 }

 onShowPropose(laclasse:string){
  this.username=this.activatedRoute.snapshot.paramMap.get('username');
   laclasse = this.activatedRoute.snapshot.paramMap.get('laclasse');
   this.router.navigate(['/proposer-projet',laclasse,this.username]);
}

goBack(){
  this.username=this.activatedRoute.snapshot.paramMap.get('username');
  this.router.navigate(['/espaces',this.username]);
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



  




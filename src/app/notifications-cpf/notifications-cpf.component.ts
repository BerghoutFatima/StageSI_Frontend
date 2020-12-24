import { Component , OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjetsService } from '../services/projets.service';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/model/model.etudiant';


@Component({
  selector: 'app-notifications-cpf',
  templateUrl: './notifications-cpf.component.html',
  styleUrls: ['./notifications-cpf.component.scss'],
})
export class NotificationsCpfComponent implements OnInit {
  private pageProjets:any;
  private etudiant:any;
  etd = new Etudiant();
  motCle: string = "";
  page:number=0;
  size:number=5;
  pages:Array<number>;
  public items: any;
  username:string;

  constructor(
    public router: Router,
    public alertController: AlertController,
    private dataservice: DataService,
    private http:HttpClient, 
    private projetservice:ProjetsService,
    private activatedRoute:ActivatedRoute
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

  goBack(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    const laclasse=this.activatedRoute.snapshot.paramMap.get('laclasse');
    this.router.navigate(['/home-cpf',laclasse,this.username]);
  }

  doSearch(classe:string){
    this.projetservice.getProjectNVViaHttp(this.motCle,classe).subscribe(data=>{
       this.pageProjets=data;
    },err=>{
       console.log(err);
    })
  }

  chercher(laclasse:string){
    laclasse = this.activatedRoute.snapshot.paramMap.get('laclasse');
    this.doSearch(laclasse);
  }

  numberOfNotifications(){
    const laclasse = this.activatedRoute.snapshot.paramMap.get('laclasse');
    this.projetservice.listerProjetsNVViaHttp(laclasse)
            .subscribe(data=>{
               this.pageProjets=data;
               //la pagination
               this.pages=new Array(data['totalPages']);
               console.log("---------------------");
               console.log(this.pageProjets.length);
               console.log("---------------------");
               return this.pageProjets;
            })
  }
 
  afficherProjets(laclasse:string){
       this.projetservice.listerProjetsNVViaHttp(laclasse)
            .subscribe(data=>{
               this.pageProjets=data;
               //la pagination
               this.pages=new Array(data['totalPages']);
               console.log("---------------------");
               console.log(this.pageProjets.length);
               console.log("---------------------");
            },err=>{
               console.log(err);
            })
  }
  listerProjets(laclasse:string){
      this.afficherProjets(laclasse);
  }

  onShowDetails(id:number){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/valider-rejetter',id,this.username]);
 }


}



  





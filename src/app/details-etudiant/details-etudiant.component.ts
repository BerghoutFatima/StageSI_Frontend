import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from 'src/model/model.projet';
import { Router } from '@angular/router';
import { ProjetsService } from '../services/projets.service';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/model/model.etudiant';
import { DataService } from '../services/data.service';
  
@Component({
  selector: 'app-details-etudiant',
  templateUrl: './details-etudiant.component.html',
  styleUrls: ['./details-etudiant.component.scss'],
})
export class DetailsEtudiantComponent implements OnInit {
  listeDesMembres:string[]=[];
  livrables:string[]=[];
  taches:string[]=[];
  commentaires: string[]=[];
  username:string;
  private etudiant:any;
  etd = new Etudiant();
  showComment=false
  comment:string;

    private projet:any;
    idProjet:number;
    idPrjt:Number;
    prjt = new Projet();
  
    constructor(
      private http:HttpClient, 
      private projetservice:ProjetsService, 
      private activatedRoute:ActivatedRoute,
      public router: Router,
      private dataservice : DataService,) 
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

  goToAbout(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/about',this.username]);
  }
  
  showComments(enable: boolean) {
    this.showComment = enable
 
  }
    goBack(){
      this.username=this.activatedRoute.snapshot.paramMap.get('username');
      this.router.navigate(['/home-etudiant',this.username]);
    }

    onComment(id:Number){
      /*this.idPrjt=this.activatedRoute.snapshot.params['id'];
      this.username=this.activatedRoute.snapshot.paramMap.get('username');
      this.router.navigate(['/commentaires-etudiant',this.idPrjt,this.username]);*/
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

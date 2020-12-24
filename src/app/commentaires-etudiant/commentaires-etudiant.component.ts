import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from 'src/model/model.projet';
import { Router } from '@angular/router';
import { ProjetsService } from '../services/projets.service';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/model/model.etudiant';
import { DataService } from '../services/data.service';
  
@Component({
  selector: 'app-commentaires-etudiant',
  templateUrl: './commentaires-etudiant.component.html',
  styleUrls: ['./commentaires-etudiant.component.scss'],
})
export class CommentairesEtudiantComponent implements OnInit {
  listeDesMembres:string[]=[];
  livrables:string[]=[];
  taches:string[]=[];
  commentaires: string[]=[];
  comment:string;
  username:string;
  prjt=new Projet();
  private etudiant:any;
  etd = new Etudiant();

    private projet:any;
    idProjet:number;
  
    constructor(
      private http:HttpClient, 
      private projetservice:ProjetsService, 
      private activatedRoute:ActivatedRoute,
      public router: Router,
      private dataservice : DataService,
      ) 
      {
  
        console.log(this.activatedRoute.snapshot.params['id']);
      this.idProjet=this.activatedRoute.snapshot.params['id']; 
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
    const idP=this.activatedRoute.snapshot.paramMap.get('id');
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/details-etudiant',idP,this.username]);
    console.log(idP);
  }

  goToAbout(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/about',this.username]);
  }
  
  commenter(){
    this.prjt=this.projet;
    console.log(this.prjt);
    this.projet.commentaires.push(this.username+":"+this.comment);
    this.projetservice.upDateProjetViaHttp(this.prjt)
    .subscribe(data => {
      console.log(data);
    },err=>{
      console.log(err);
    })
  }

    ngOnInit() {
      this.idProjet=this.activatedRoute.snapshot.params['id']; 
      this.projetservice.detailsProjetViaHttp(this.idProjet)
          .subscribe(data=>{
                   console.log(data);
                   this.projet=data;
                   this.commentaires=this.projet.commentaires;
               },err=>{
                   console.log(JSON.parse(err._body).message);
               })
    }
  
  }

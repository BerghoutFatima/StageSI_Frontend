import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from 'src/model/model.projet';
import { Router } from '@angular/router';
import { ProjetsService } from '../services/projets.service';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/model/model.etudiant';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.scss'],
})
export class CommentairesComponent implements OnInit {
  listeDesMembres:string[]=[];
  livrables:string[]=[];
  taches:string[]=[];
  commentaires: string[]=[];
  comment:string;
  prjt=new Projet();
  private etudiant:any;
  etd = new Etudiant();

    private projet:any;
    idProjet:number;
    username:string;
  
    constructor(
      private http:HttpClient, 
      private projetservice:ProjetsService, 
      private activatedRoute:ActivatedRoute,
      private dataservice: DataService,
      public router: Router) 
      {
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
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    const idP=this.activatedRoute.snapshot.paramMap.get('id');
    this.router.navigate(['/details-projet',idP,this.username]);
    console.log(idP);
  }

  commenter(){
    this.prjt=this.projet;
    console.log(this.prjt);
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.projet.commentaires.push(this.username +":"+this.comment);
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

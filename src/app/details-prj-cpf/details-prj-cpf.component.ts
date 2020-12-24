import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from 'src/model/model.projet';
import { Router } from '@angular/router';
import { ProjetsService } from '../services/projets.service';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/model/model.etudiant';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details-prj-cpf',
  templateUrl: './details-prj-cpf.component.html',
  styleUrls: ['./details-prj-cpf.component.scss'],
})
export class DetailsPrjCpfComponent implements OnInit {
  listeDesMembres:string[]=[];
  livrables:string[]=[];
  taches:string[]=[];
  commentaires: string[]=[];
  private etudiant:any;
  etd = new Etudiant();
  
    private projet:any;
    idProjet:number;
    laclasse:String;
    username:string;
  
    constructor(
      private http:HttpClient, 
      private projetservice:ProjetsService, 
      private activatedRoute:ActivatedRoute,
      public router: Router,
      private dataservice: DataService,) 
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
      this.router.navigate(['/home-cpf',this.projet.laclasse,this.username]);
    }

    ngOnInit() {
      this.projetservice.detailsProjetViaHttp(this.idProjet)
          .subscribe(data=>{
                   console.log(data);
                   this.projet=data;
                   console.log("__________")
                   console.log(this.projet);
                   console.log("__________")
                   this.listeDesMembres=this.projet.listeDesMembres;
                   console.log("__________")
                   console.log(this.listeDesMembres);
                   console.log("__________")
                   this.livrables=this.projet.livrables;
                   this.taches=this.projet.taches;
                   this.commentaires=this.projet.commentaires;
               },err=>{
                   console.log(JSON.parse(err._body).message);
               })
    }
  
  }
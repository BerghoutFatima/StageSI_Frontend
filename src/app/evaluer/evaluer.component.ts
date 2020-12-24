import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from 'src/model/model.projet';
import { Router } from '@angular/router';
import { ProjetsService } from '../services/projets.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Etudiant } from 'src/model/model.etudiant';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-evaluer',
  templateUrl: './evaluer.component.html',
  styleUrls: ['./evaluer.component.scss'],
})
export class EvaluerComponent implements OnInit {


  projet:Projet=new Projet();
  private prjt:any;
  idProjet:number;
  note:number;
  username:string;
  private etudiant:any;
  etd = new Etudiant();

  constructor(private http:HttpClient, private dataservice: DataService, private projetservice:ProjetsService, private activatedRoute:ActivatedRoute, public router: Router, public alertController: AlertController)
  {
       console.log(this.activatedRoute.snapshot.params['id']);
       this.idProjet=this.activatedRoute.snapshot.params['id'];
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
    this.projetservice.detailsProjetViaHttp(this.idProjet)
           .subscribe(data => {
                this.prjt=data;
            },err=>{
                console.log(err);
             })
  }

  async evaluer(){
       
       this.username=this.activatedRoute.snapshot.paramMap.get('username');
       this.projet.note=0;
       this.projet=this.prjt;
       const idP=this.activatedRoute.snapshot.paramMap.get('id');
       const converted_note = this.note.toString();
       console.log(converted_note);
       //console.log(this.projet.notes);
       
       this.prjt.note=converted_note;
       this.projetservice.upDateProjetViaHttp(this.projet)
              .subscribe(data => {
                    console.log(data);
                    console.log(this.projet.note);
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
                         this.router.navigate(['/details-projet',idP,this.username]);
                       }
                     }
             ]
           });

       await alert.present();
  }

  goBack(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
     const idP=this.activatedRoute.snapshot.paramMap.get('id');
     this.router.navigate(['/details-projet',idP,this.username]);
     console.log(idP);
  }


}
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploadService } from '../services/FileUploadService.service';
import { HttpClient ,HttpResponse ,HttpEventType, HttpClientModule} from '@angular/common/http';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Projet } from 'src/model/model.projet';
import { Etudiant } from 'src/model/model.etudiant';
import { ProjetsService } from '../services/projets.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {


  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  private pageProjets:any;
  private pageProjetsEtudiant:Projet [] ;
  private etudiant:any;
  
  etd = new Etudiant();
  selectedFile = null;
  @ViewChild("fileUpload", {static: false}) 
  fileUpload: ElementRef;
  files  = [];  
  file:any
  id:number;
  fileName:string;
  username:string;
  idProjet:number;
  private projet:any;
  listeDesMembres:string[]=[];
  livrables:string[]=[];
  taches:string[]=[];
  date_depot_etudiant: string[]=[];
  commentaires: string[]=[];
  prjt=new Projet();
  currentDate: string;
  

constructor(
  private fileUploadService:FileUploadService,
  private http:HttpClient,
  private activatedRoute:ActivatedRoute,
  public router: Router,
  private dataservice: DataService,
  private projetservice:ProjetsService,
  
  ) { 
      this.username=this.activatedRoute.snapshot.paramMap.get('username');
      this.dataservice.findEtudiantsByUsername(this.username).subscribe(data=>{
        this.etudiant=data;
        console.log(data);
        this.etd = this.etudiant;
      },err=>{
        console.log(err);
     })
     //
     const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    
  }

  showFile = false
  fileUploads: any
 
  ngOnInit() {
    this.idProjet=this.activatedRoute.snapshot.params['id']; 
    this.projetservice.detailsProjetViaHttp(this.idProjet)
          .subscribe(data=>{
                   console.log(data);
                   this.projet=data;
                   this.prjt=this.projet;
                   this.listeDesMembres=this.projet.listeDesMembres;
                   this.livrables=this.prjt.livrables;
                   this.taches=this.projet.taches;
                   this.commentaires=this.projet.commentaires;
                   this.date_depot_etudiant=this.projet.date_depot_etudiant;
                   console.log("rrrr")
                   console.log( this.projet.date_depot_etudiant)
               },err=>{
                   console.log(JSON.parse(err._body).message);
               })
  }
  goToPost(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/deposer',this.username]);
  }
 
  showFiles(enable: boolean) {
    this.showFile = enable
 
    if (enable) {
      this.fileUploads = this.projetservice.getFiles();
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    this.progress.percentage = 0;

    this.projetservice.detailsProjetViaHttp(this.idProjet)
          .subscribe(data=>{
                   this.projet=data;
                   this.livrables=this.projet.livrables;
               },err=>{
                   console.log(JSON.parse(err._body).message);
               })
 
               //
               
    this.prjt=this.projet;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.projetservice.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        console.log(this.currentDate);
        this.projet.date_depot_etudiant=this.date_depot_etudiant;
        console.log(this.date_depot_etudiant)
        console.log("----")
        console.log(this.date_depot_etudiant)
        this.prjt.livrables.push("http://localhost:8080/files/"+this.currentFileUpload.name);
        
        this.date_depot_etudiant.push(this.currentDate)
        console.log("this.date_depot_etudiant");
        console.log(this.date_depot_etudiant);
        this.projet.date_depot_etudiant=this.date_depot_etudiant;
        //this.projet.date_depot_etudiant.push("jj"+this.currentDate);
        
        this.projetservice.upDateProjetViaHttp(this.prjt)
            .subscribe(data => {
              console.log("oooooooooooop")
            console.log(this.projet);
            console.log(this.prjt);
            },err=>{
            console.log(err);
            })
      }

    })
 
    this.selectedFiles = undefined
  }

}

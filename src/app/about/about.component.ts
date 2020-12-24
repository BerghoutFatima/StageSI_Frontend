import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/model/model.etudiant';
import { Projet } from 'src/model/model.projet';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  
  username:string;
  private etudiant:any;
  etd = new Etudiant();

  constructor(
    private activatedRoute:ActivatedRoute,
    public router: Router,
    private dataservice: DataService,
  ) { 
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

  ngOnInit() {}

  goBack(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/home-etudiant',this.username]);
  }

}

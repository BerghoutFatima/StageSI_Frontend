import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-espaces-cpf',
  templateUrl: './espaces-cpf.component.html',
  styleUrls: ['./espaces-cpf.component.scss'],
})
export class EspacesCPFComponent implements OnInit {
  
  currentDate: string;
  laclasse: string;
  username:string;
  

  constructor(public router: Router, private activatedRoute:ActivatedRoute) { 
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
  }

  ngOnInit() {
  }
  onShowHomeCpf1(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/home-cpf',"1GI",this.username]);
  }
  onShowHomeCpf2(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
      this.router.navigate(['/home-cpf',"2GI",this.username]);
  }
  onShowHomeCpf3(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/home-cpf',"3GI",this.username]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-espaces',
  templateUrl: './espaces.component.html',
  styleUrls: ['./espaces.component.scss'],
})
export class EspacesComponent implements OnInit {
  
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
  onShowHome1(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/home',"1GI",this.username]);
  }
  onShowHome2(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
      this.router.navigate(['/home',"2GI",this.username]);
  }
  onShowHome3(){
    this.username=this.activatedRoute.snapshot.paramMap.get('username');
    this.router.navigate(['/home',"3GI",this.username]);
  }

}


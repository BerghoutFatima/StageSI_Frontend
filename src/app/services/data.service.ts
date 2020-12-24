import { Injectable } from '@angular/core';
import { getMaxListeners } from 'process';
import { HttpClient } from '@angular/common/http';
import { Etudiant } from 'src/model/model.etudiant';


@Injectable({
  providedIn: "root"
})
export class DataService {
  public items: any = [];

    constructor(private http:HttpClient) { }

    listerEtudiantsViaHttp(laclasse:string) {
      //return this.items=this.http.get("http://localhost:8080/listerEtudiants");
      return this.http.get("http://localhost:8080/listerEtudiantsParClasse/"+laclasse);
    }
    /*listerEtudiants2giViaHttp() {
      return this.items=this.http.get("http://localhost:8080/listerEtudiantsParClasse/2gi");
    }
    listerEtudiants3giViaHttp() {
      return this.items=this.http.get("http://localhost:8080/listerEtudiantsParClasse/3GI");
    }*/
    findEtudiantsByUsername(username:string){
      return this.http.get("http://localhost:8080/trouverEtudiantByUsername?un="+username);
    }

    findEtudiantsByEmail(email:string){
      return this.http.get("http://localhost:8080/trouverEtudiantByEmail/"+email);
    }

    getEtudiantViaHttp(username: string, email:string) {
      return this.http.get("http://localhost:8080/trouverEtudiant?un="+username+"&email="+email);
     
   }
//tester si un etudiant est deja inscris
   loginEtudiantViaHttp(email: string, password:string) {
    return this.http.get("http://localhost:8080/trouverEtudiantParLogin?email="+email+"&password="+password);
   
 }
   

    addUserViaHttp(etudiant:Etudiant) {
    // s'il y a un post il faut envoyer un corps de la requete qui est letudiant dans ce cas
    return this.http.post("http://localhost:8080/ajouterEtudiant", etudiant);
     }

     //modifier Etudiant
 upDateEtudiantViaHttp(etudiant:Etudiant){
  return this.http.put("http://localhost:8080/updateEtudiant/"+etudiant.id,etudiant);
}

  /*filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }*/
}
import { Injectable } from '@angular/core';
import { Projet } from 'src/model/model.projet';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetsService {

  constructor(private http:HttpClient) { }

  listerProjetsViaHttp(laclasse:string) {
    return this.http.get("http://localhost:8080/listerProjetParClasse/"+laclasse);
  }

  allProjectsValidesByHttp(){
    return this.http.get("http://localhost:8080/listerProjetsvalides");
  }

  allProjectsEtudiantValidesByHttp(){
    return this.http.get("http://localhost:8080/listerProjetsvalidesEtudiant");
  }

  
  listerProjetsNVViaHttp(laclasse:string) {
    return this.http.get("http://localhost:8080/listerProjetNVParClasse/"+laclasse);
  }
  
  proposerProjetViaHttp(projet:Projet) {
     // s'il y a un post il faut envoyer un corps de la requete qui est projet dans ce cas
     return this.http.post("http://localhost:8080/ajouterProjet", projet);
  }
  detailsProjetViaHttp(id:number) {
    // s'il y a un post il faut envoyer un corps de la requete qui est projet dans ce cas
    return this.http.get("http://localhost:8080/detailsProjet/"+id);
 }

 supprimerProjetViaHttp(id:number) {
  return this.http.delete("http://localhost:8080/supprimerProjets/"+id);
}
//chercher les prjs validés dans un niveau donné
  getProjectViaHttp(motCle: string, laclasse:string) {
       return this.http.get("http://localhost:8080/chercherProjets?mc="+motCle+"&laclasse="+laclasse);
      
    }

    //chercher les prjs non validés dans un niveau donné
    getProjectNVViaHttp(motCle: string, laclasse:string) {
      return this.http.get("http://localhost:8080/chercherProjetsNV?mc="+motCle+"&laclasse="+laclasse);
     
   }
    //chercher dans la liste de tous les projets disponibles sous entendu tous les niveaux
    getProjectFromAllViaHttp(motCle: string) {
      return this.http.get("http://localhost:8080/chercherProjet?mc="+motCle);
     
   }
  

 //modifier projet
 upDateProjetViaHttp(projet:Projet){
   return this.http.put("http://localhost:8080/updateProjets/"+projet.id,projet);
 }
 //
 pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
  let formdata: FormData = new FormData();

  formdata.append('file', file);

  const req = new HttpRequest('POST', "http://localhost:8080/post", formdata, {
    reportProgress: true,
    responseType: 'text'
  });

  return this.http.request(req);
}

getFiles() {
  return this.http.get("http://localhost:8080/getallfiles");
}
    
}

export class Projet{
    id:any=null;
    titre:string="";
    descriptif:string="";
    taches:string[]=[];
    status:Number=0;
    laclasse:string="";
    date_depot_responsable:Date=null;
    date_depot_etudiant:string[]=[];
    delai_realisation:Date=null;
    livrables:string[]=[];
    commentaires:string[]=[];
    //listeDesMembres:Etudiant[]=[];
    listeDesMembres:string[]=[];
    note:number=0;
}
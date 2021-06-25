import { Lcollecte } from './lcollecte';

export class Collecte{
    id :number;
    annee : number;
    numero : number;
    date_mvt : any;
    totht : number;
    tottva : number;
    totttc : number;

    codevoiture: number;
    codechauff: String;
    codefacteur: String;


    lcollectes :Array<Lcollecte> =[];
    
    
}

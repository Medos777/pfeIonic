import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { DepotService} from '../../service/depot.service';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.page.html',
  styleUrls: ['./suivi.page.scss'],
})
export class SuiviPage implements OnInit {
  appear:boolean=false;
  etat:String='';

  constructor(private DepotService :DepotService ,public fb: FormBuilder) { }

  ngOnInit() {
  }

  onCodebarre(code){
    this.appear=false;
 
    console.log(code.value.length);
    if(code.value.length==12){
      this.appear=true;

      this.DepotService.getDataByCodeb(code.value).subscribe( data => {


       if(data.etat=="elivre"){
this.etat="Envoi Livré";
       }
       else if(data.etat=="evpt"){
        this.etat="envoyer vers le prochain point de traitement";

       }
       else if(data.etat=="rbliv"){
        this.etat="Recevoir envoi au bureau de livraison";
      }
       else if(data.etat=="rpclient"){
        this.etat="Recevoir les envois du client";
      }
      else if(data.etat=="nenvoye"){
        this.etat="";

      }
       
      });

    }

  }

}

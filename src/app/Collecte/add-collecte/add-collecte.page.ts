import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Lcollecte } from 'src/app/model/lcollecte';
import { ChauffeurService } from 'src/app/service/chauffeur.service';
import { CollecteService } from 'src/app/service/collecte.service';
import { CompteurService } from 'src/app/service/compteur.service';
import { DestinationService } from 'src/app/service/destination.service';
import { LcollecteService } from 'src/app/service/lcollecte.service';
import { TarifService } from 'src/app/service/tarif.service';
import { UserService } from 'src/app/service/user.service';
import { VoitureService } from 'src/app/service/voiture.service';
import { LcollectePage } from '../lcollecte/lcollecte.page';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-add-collecte',
  templateUrl: './add-collecte.page.html',
  styleUrls: ['./add-collecte.page.scss'],
})
export class AddCollectePage implements OnInit {
  numligne:number=1;

user: any;
  FacteurList: any[];
  destinationList:any[];
  VoituresList: any[];
  ChauffeursList:any[];
  compteur : any={};

  isValid:boolean = true;
  destinationCode:number;
  articleService: any;
  Date;

  annee  = 0;
  constructor(public service:CollecteService,
    public toastCtrl: ToastController,
    public lcollectService:LcollecteService,
    private dialog:MatDialog,public fb: FormBuilder,
    public userService :UserService,

    private tarifService :TarifService,
    private destinationService :DestinationService,
    private compteurService :CompteurService,

    private voitureService :VoitureService,
    private chauffeurService :ChauffeurService,
    private AuthentificationService : AuthentificationService,
    private tokenService: TokenStorageService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls }

    ngOnInit() {

      this.user=this.tokenService.getUser();


      if (this.service.choixmenu == 1){
       this.InfoForm();
       this.service.list = [];
       this.Date = this.transformDate(new Date(Date.now()));
       this.annee = (this.Date).toString().substring(0,4);
       this.f['annee'].setValue(this.annee);
       this.onSelectCompteur(this.annee);
       }
         else
       {
        
                  this.lcollectService.getAllByNumero(this.service.formData.value.numero).subscribe(
        response =>{
          console.log(response);
          this.service.list = response}
        );
        this.f['date_mvt'].setValue(this.service.formData.value.date_mvt);
       }
   
   this.userService.listUserByRole('facteur').subscribe(
     response =>{this.FacteurList = response;}
    );
    this.destinationService.getAll().subscribe(
      response =>{this.destinationList = response;
       
      }
     );

     this.voitureService.getAll().subscribe(
      response =>{this.VoituresList = response;
       
      }
     );

     this.chauffeurService.getAll().subscribe(
      response =>{this.ChauffeursList = response;
       
      }
     );

    
     }
   
   
     
     public logout() {
      this.tokenService.signOut();
      this.AuthentificationService.logout();
      this.AuthentificationService.loginc = false;
      this.AuthentificationService.connected=false;
      this.router.navigate(['login']);
  
      
    }  
     showToastMsg() {
      this.toastCtrl.create({
        message: 'Tiny Toast!',
        duration: 1800
      }).then((toastRes) => {
        console.log(toastRes);
        toastRes.present();
      });
    }  

       
   InfoForm() {
       this.service.formData = this.fb.group({
         id :null,
         annee : 0,
         numero : 0,
         libelle:'',
         date_mvt : '',
         codefacteur : '',
         totht : 0,
         tottva : 0,
         typecorr:'',

         totttc : 0,
        

         beneficier:'',

         codevoiture:'',

         codechauff:0,
         destinationLibelle:'',

         destinationId:0,

         lcollectes :[],
         });
       } 
     
   resetForm() {
         this.service.formData.reset();
     }
   
   AddData(lcollecteIndex,Id){  
       const dialogConfig = new MatDialogConfig();
       dialogConfig.autoFocus = true;
       dialogConfig.disableClose = true;
       dialogConfig.width="100%";
       dialogConfig.height="100%";
       for(let dest of this.destinationList ){
        if (dest.id==this.service.formData.value.destinationId)
        this.destinationCode=dest.code;
      }
       let destcode=this.destinationCode;
       let numl=this.numligne
       let typecorrier=this.service.formData.value.typecorr;
       console.log(typecorrier);
       dialogConfig.data={typecorrier,lcollecteIndex,Id,destcode,numl};
       this.numligne= this.numligne+1

       
       this.dialog.open(LcollectePage, dialogConfig).afterClosed().subscribe(b10=>{
         this.calcul();
       });
     }
   
   
   onDelete(item : Lcollecte,Id:number,i:number){
       if(Id != null)
       this.service.formData.value.id+=Id ;
      this.service.list.splice(i,1);
      this.lcollectService.deleteData(item.id).subscribe(
       );

      this.calcul();
      }
   
   calcul(){
     
     this.f['totht'].setValue((this.service.list.reduce((prev, curr) => {
       return prev + curr.totht;
     }, 0)).toFixed(3));
     this.f['tottva'].setValue((this.service.list.reduce((prev, curr) => {
       return prev + curr.tottva;
     }, 0)).toFixed(3));
     this.f['totttc'].setValue((this.service.list.reduce((prev, curr) => {
       return prev + curr.totttc;
     }, 0)).toFixed(3));   
     
      }
   validateForm(){
        this.isValid = true ;
       
        if(this.service.formData.value.idclient==0)
        this.isValid =false;
       
        else if (this.service.list.length==0)
        this.isValid =false;
        return this.isValid;
      }
   
onSelectCompteur(annee: number)
{
 this.compteurService.getDatabyAnnee(annee).subscribe(
   response =>{
     this.compteur = response;
     let numd=this.compteur.annee*10000+this.compteur.numcollect;
     this.f['numero'].setValue(numd);
     }
  );  
} 
   onSubmit(){
    this.f['codefacteur'].setValue(this.user.id);

       this.f['lcollectes'].setValue(this.service.list);
       console.log(this.service.formData.value);

         this.service.createData(this.service.formData.value).
         subscribe( data => {
           this.toastCtrl; 
           this.router.navigate(['/collectes']);
         });
         this.service.list = [];

      }
     
   transformDate(date){
        return this.datePipe.transform(date, 'yyyy-MM-dd');
      }
      destinationId
      OnSelectDest(ctrl){
        if(ctrl.selectedIndex == 0){
          this.f['destinationId'].setValue('');
          this.f['destinationLibelle'].setValue('');
         }
         else{
            this.f['destinationId'].setValue(this.destinationList[ctrl.selectedIndex - 1].id);
            this.f['destinationLibelle'].setValue(this.destinationList[ctrl.selectedIndex - 1].libelle);
            this.destinationCode=this.destinationList[ctrl.selectedIndex - 1].code;
         }
      }

      OnSelectVoit(ctrl){
        if(ctrl.selectedIndex == 0){
          this.f['codevoiture'].setValue('');
         }
         else{
            this.f['codevoiture'].setValue(this.VoituresList[ctrl.selectedIndex - 1].code);
         }

      }
      OnSelectChauff(ctrl){
        if(ctrl.selectedIndex == 0){
          this.f['codechauff'].setValue(0);
         }
         else{
            this.f['codechauff'].setValue(this.ChauffeursList[ctrl.selectedIndex - 1].code);
         }
        
      }
  
      }
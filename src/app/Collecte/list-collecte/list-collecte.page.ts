import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Collecte } from 'src/app/model/collecte';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { CollecteService } from 'src/app/service/collecte.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-list-collecte',
  templateUrl: './list-collecte.page.html',
  styleUrls: ['./list-collecte.page.scss'],
})
export class ListCollectePage implements OnInit {
  role: any;
  user: any;
  list : Collecte[];
  SearchText :string;
  constructor( private service :CollecteService,private router:Router,private tokenService: TokenStorageService,
    private AuthentificationService : AuthentificationService,
    public fb: FormBuilder,
    private datePipe : DatePipe) { }

  ngOnInit() {
    if(this.tokenService.getToken())
    {
      this.role=this.tokenService.getUser().role;
      this.user=this.tokenService.getUser();
    }
    console.log(this.role);
    this.refreshListe();
    
  }
refreshListe(){
  if(this.role=="facteur"){

 
  this.service.getAll().subscribe(
    response =>{this.list = response;
      console.log(response);
      console.log(this.list)

    }
   );
  }
  else if(this.role=="client"){
    this.service.getDataByIdClient(this.user.id).subscribe(
      response => { this.list = response; }
    );
  }

}


  onDelete(id: number) {
   
    if (window.confirm('Are sure you want to delete this ?')) {
      this.service.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.refreshListe();
          },
          error => console.log(error));
    }
  }
  newCollecte()
  {
    this.service.choixmenu =1
  this.router.navigate(['/addcollectes']);
  }
  searchByLib(){
    if(this.SearchText=='')
    this.refreshListe();
    else{
      if (this.role=="facteur")
      {
      this.service.getDataByLib(this.SearchText).subscribe(
        response =>{this.list = response;}
       );
      }
       else 
       {
        this.service.getDataByLibandClient(this.SearchText,this.user.id).subscribe(
          response =>{this.list = response;}
         );

       }
    }

    
  }
onSelect(item :Collecte){
  this.service.formData = this.fb.group(Object.assign({},item));
  this.service.choixmenu =2
  this.router.navigate(['/addcollectes']);
}
transformDate(date){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}
public logout() {
  this.tokenService.signOut();
  this.AuthentificationService.logout();
  this.AuthentificationService.loginc = false;
  this.AuthentificationService.connected=false;
  this.router.navigate(['login']);

  
}

}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'POST, GET, PUT, OPTIONS, DELETE, PATCH',
  'Accept':'application/json'})}
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private baseUrl = 'http://localhost:8088/api/home';
  connected=false;
  loginc=false;
  role = "";
  constructor(private http: HttpClient) { }
  login(username:string,password:string):Observable<any>
  {

    //console.log(username,password);
   return this.http.post(`${this.baseUrl}/login`,{username,password},httpOptions);
  }

logout(){
  return this.http.post(`${this.baseUrl}/logout`,null);

}
test():Observable<any> {
  console.log(this.baseUrl);
  return this.http.post(`${this.baseUrl}/test`, null);

}


}

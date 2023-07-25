import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  loginStatus:boolean=false;
  welcomepage:boolean=true;

  loggedIn(){
  this.loginStatus=true;
  this.welcomepage=false;
  }

  loggedOut(){
    this.loginStatus=false;
    this.welcomepage=true;
  }

  login(data:any) {
   return this.http.post('http://localhost:8181/voter/login',data);
  }

  register(data:any) {
    return this.http.post('http://localhost:8181/voter/register',data);
   }

   getVoter(data:string|null) {
    return this.http.get(`http://localhost:8181/voter/get/${data}`);
   }

   getVoterStatusChanger(data:string|null) {
    return this.http.get(`http://localhost:8181/voter/status/${data}`);
   }

}

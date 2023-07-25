import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginstatus: boolean = this.log.loginStatus;
  
  welcomepage:boolean=this.log.welcomepage;

constructor(private log:LoginService ){}
  ngOnInit(): void {
 console.log(this.loginstatus)
  }

logout(){
 this.log.loggedOut();
  localStorage.setItem("username", "")
}

}

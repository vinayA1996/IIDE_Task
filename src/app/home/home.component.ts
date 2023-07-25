import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginstatus: boolean = this.log.loginStatus;
  
  welcomepage:boolean=this.log.welcomepage;

constructor(private log:LoginService,private router: Router ){}
  ngOnInit(): void {
 console.log(this.loginstatus)
 this.router.navigateByUrl("/dashboard")

  }

logout(){
 this.log.loggedOut();
  localStorage.setItem("username", "")
}

}

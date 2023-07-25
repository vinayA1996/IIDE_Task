import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


loginStatus:boolean=false; 

  user: any;
  public form !: FormGroup;
  constructor( private formBuilder: FormBuilder,private log:LoginService,private router: Router) { 
   {
    this.form = this.formBuilder.group({
      username:['', [Validators.required,]],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
  } 
}
  ngOnInit(): void {
   this.loginStatus=this.log.loginStatus;
   if(this.loginStatus){
    alert("already logged in")
    this.router.navigateByUrl("/vote")
   }
  }





login()
  {
   
    
    this.log.login(this.form.value).subscribe({
      next: data => {
        this.user=data;
        console.log(this.user);
        alert( `welcome ${this.user.username}`);
        localStorage.setItem("username", this.user.username);
        console.log(this.user.role);
if(this.user.role==="admin"){
  this.log.loggedIn();

  this.router.navigateByUrl("/admin");
}else{
  this.log.loggedIn();
console.log(this.log.loginStatus);

  this.router.navigateByUrl("/vote")}
        
    
    },
    error: err => {
      console.log(err)
      alert("Invalid login details. Try again");
      // this.form.reset();
    }} 
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form !: FormGroup;
  user:any;

  loginStatus:boolean=false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private log: LoginService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.loginStatus=this.log.loginStatus;
   if(this.loginStatus){
    alert("already logged in")
    this.router.navigateByUrl("/vote")
   }
  }

  signUp(){
    
    const user={
      email:this.form.value.email,
      username:this.form.value.username,
      password:this.form.value.password,
      phone:this.form.value.phone,
      role:"user",
      votingStatus:true
    }
    this.log.register(user).subscribe({
      
      next: data => {
        this.user=data;
        console.log(this.user);
        alert( `Register Succfull ${this.user.username}`);
        this.router.navigateByUrl("/login")
    },
    
    error: err => {
      console.log(err)
      alert("Already registered");
      // this.form.reset();
    }} 
    )
  }
    
  }



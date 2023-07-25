import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voting-dashboard',
  templateUrl: './voting-dashboard.component.html',
  styleUrls: ['./voting-dashboard.component.css']
})
export class VotingDashboardComponent implements OnInit {

  candidates:any=[];
  constructor(private admin:AdminService,private log:LoginService,private router: Router){}
  votingStatus:boolean=true;
  voter:any=null;
  candidateName:string="";

  loginstatus=this.log.loginStatus;
  ngOnInit(){
 this.admin.getCandidates().subscribe({
  next: data => {
    this.candidates=data;
   console.log(data);
   
  }}

 )


 this.log.getVoter(localStorage.getItem('username')).subscribe({
  next: data => {
   this.voter=data;
   console.log(this.voter.votingStatus);
   this.votingStatus=this.voter.votingStatus;
  }}

 )


  }

  vote(candidate:string){

    var d= document.getElementById("html");
    console.log(d);
    this.candidateName=candidate;
   
    
    console.log(this.candidateName);
    

      
  }

  submitVote(){
    this.admin.giveVote(this.candidateName).subscribe({
      next: data => {
       console.log(data);
      }})
      this.log.getVoterStatusChanger(localStorage.getItem('username')).subscribe();
      this.router.navigateByUrl("/home");
      alert(`vote successfully submitted to ${this.candidateName}`);
      localStorage.setItem("username", "")
      this.log.loggedOut();
  }


  logout(){
    this.log.loggedOut();
     localStorage.setItem("username", "")
   }
   

}

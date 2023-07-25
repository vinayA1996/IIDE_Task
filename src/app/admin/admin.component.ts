import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  candidates: any = [];

  constructor(
    private admin: AdminService,
    private log: LoginService,
    private router: Router
  ) {}
  votingStatus: boolean = true;
  voter: any = null;
  candidateName: string = '';

  loginstatus = this.log.loginStatus;
  ngOnInit() {
    this.admin.getCandidates().subscribe({
      next: (data) => {
        this.candidates = data;
        console.log(this.candidates);
      },
    });

    this.log.getVoter(localStorage.getItem('username')).subscribe({
      next: (data) => {
        this.voter = data;
        console.log(this.voter.votingStatus);
        this.votingStatus = this.voter.votingStatus;
      },
    });
  }

  logout() {
    this.log.loggedOut();
    localStorage.setItem('username', '');
  }
  onDeleteClick(candidate: any) {
    console.log(
      'Delete button clicked for candidate:',
      candidate.candidateName
    );
    // You can now use the candidate object to perform the delete operation
    // For example, remove the candidate from the candidates array:
    const index = this.candidates.indexOf(candidate);
    if (index !== -1) {
      this.candidates.splice(index, 1);
    }

    this.admin.deleteCandidate(candidate.candidateName).subscribe();
  }
}

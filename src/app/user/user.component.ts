import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any = [];
  attempts: any = [];

  constructor(private userSerivce : UserService) { }

  ngOnInit() {
    this.userSerivce.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  getUserAttempts(uId:string) {
    console.log("getting attempts for user 111"+uId);
       this.userSerivce.getUserAttempts(uId).subscribe(attempts => {
      this.attempts = attempts;
      console.log(this.attempts.length);
    });
  }

  addAttempt(uId:string) {
    console.log("Adding attempt for "+uId);
    this.userSerivce.addUserAttempts(uId);
  }
}
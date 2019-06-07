import { Component, OnInit } from '@angular/core';
import {ResultsService} from '../shared/results.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  attempts : any = [];
  currentAttemptId : string;
  attemptDetails : any=[];
  uId : string;

  constructor(private resultsService:ResultsService,private route: ActivatedRoute) { }

  ngOnInit() {
      this.uId = this.route.snapshot.params['uId'];
      this.resultsService.getUserAttempts(this.uId).subscribe(attempts => {
      this.attempts = attempts;
      console.log(this.attempts);
    });
  }

  showResult(index:number) {
    this.currentAttemptId = this.attempts[index].id;
    this.attemptDetails = this.attempts[index].attemptDetails;
    console.log(" got attempts");
  }

}
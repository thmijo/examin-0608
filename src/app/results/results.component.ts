import { Component, OnInit } from '@angular/core';
import {ResultsService} from '../shared/results.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  attemptIDs : any = [];
  currentAttemptId : string;
  attemptDetails : any=[];
  uId : string;

  constructor(private resultsService:ResultsService,private route: ActivatedRoute) { }

  ngOnInit() {
      this.uId = this.route.snapshot.params['uId'];

        this.resultsService.getUserAttemptIDs(this.uId).then(doc => {
        console.log (doc.data());
        this.attemptIDs = doc.data().attemptDetails;
    });

    /*  this.resultsService.getUserAttemptIDs(this.uId).then(attempts => {
      this.attemptIDs = attempts;
      console.log(this.attemptIDs);
    }); */
  }

  showResult(attemptId:string) {
   // this.attemptDetails = 
     // this.currentAttemptId = attemptId;
     this.resultsService.getAttemptDetails(attemptId).then(doc => {
        console.log (doc.data());
        this.attemptDetails = doc.data().attemptDetails;
        console.log(" got attempts");
  });
}
} 
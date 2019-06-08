import { Component, OnInit } from '@angular/core';
import {ExamService} from '../shared/exam.service';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
exams: any = [];
tempQId : string;

  constructor(private examService : ExamService) { }

  ngOnInit() {
    console.log("Getting Questions");
    // console.log(this.questionService.getQuestions());

    
    this.examService.getExams().subscribe(exams => {
      this.exams = exams;
     // console.log(this.exams);
    });

  }

  addExam() {
    console.log("adding dummy exam");
    this.examService.addExam();
    //this.examService.
  }

  deleteExam(eId:string) {
    console.log("Deleting Exam"+eId);
    this.examService.deleteExam(eId);
  }
 loadQuestions (eId:string) {
      console.log ("Loading questions noww.. "+eId);
      this.examService.loadQuestions(eId);
      //console.log ("Loading questions noww.. "+message);
  }
}
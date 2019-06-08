import { Component,ViewChild, OnInit } from '@angular/core';
import { QuestionService } from "../shared/question.service";
import {ActivatedRoute,Router} from '@angular/router';
import {Question} from '../shared/interface/question';
import { NgForm } from '@angular/forms';
import {UserService} from '../shared/user.service';


@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {
@ViewChild('f', { static: false }) signupForm : NgForm;  
questions: any = [];
examId : string;
questionIDs: any = [];
question :any;
currentQuestionId : string;
currentQuestionIndex : number = -1;
previousQuestionIndex : number;
nextQuestionIndex : number = 1;
flag : boolean = false;
uId : string = "arHiJ1xEbfjTRJbNnstz";

  constructor(private questionService: QuestionService,private userService : UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.examId = this.route.snapshot.params['eId'];
    console.log("my Exam id "+this.examId);
    this.questionService.getExamQuestion(this.examId).then(doc => {
       console.log (doc.data());
       this.questionIDs = doc.data().questionRef;
    });


    //console.log(this.questions);
  
  }
  showQuestion(i:number) {
  this.currentQuestionIndex = i;
  console.log("geting question"+i+ "  "+this.questionIDs[i]);
    this.questionService.getQuestion(this.questionIDs[i]).then(doc => {
       console.log (doc.data());
       this.question = doc.data();
    }); 
  }  

 /*  ngOnInit() {
    this.examId = this.route.snapshot.params['eId'];
    console.log("my Exam id "+this.examId);
    this.questionService.getExamQuestion(this.examId).subscribe(questions => {
      this.questions = questions;
      console.log("Logging exam quesiton"+this.questions);
    });
   } */

  rbClick(i:number,selectedOption:string) {
    // console.log ("radio button @@@"+this.signupForm.value.Option);
    // console.log ("radio button clicked"+selectedOption);
     this.questions[i].sel = selectedOption;
  }

getQuestion(i:number) {
    console.log ("getttting values submitted"+this.signupForm.value.Option);
    this.currentQuestionIndex = i;
    this.previousQuestionIndex = i-1;
    if (this.previousQuestionIndex<0) 
       this.previousQuestionIndex = null
    this.nextQuestionIndex = i+1;
    if (this.nextQuestionIndex > this.questions.length-1)
    this.nextQuestionIndex = null;
     this.signupForm.reset();
   // this.questions[i-1].sel = "!!!!!!!!!!!!!!!!!!!!!!!!!"+this.signupForm.value.Option;
    //this.getQuestion.bind("ans3");
   // console.log(this.questions[this.currentQuestionIndex]);
       console.log("trying to route---"+this.uId);
      
       console.log("am i printing");
  }

 /* getQuestions() {
    console.log("Getting Questions");
    // console.log(this.questionService.getQuestions());

    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
      console.log(this.questions);
    });
  } */
  onSubmit() {
    console.log ("form submitted"+this.signupForm.value.Option);
    console.log ("form submitted"+this.signupForm.value.one);
    //this.signupForm.reset();
   
  // console.log (this.questions);
    
    this.userService.addUserAttempts2('arHiJ1xEbfjTRJbNnstz', this.questions);
  //  this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
   this.router.navigate(['/results/'+this.uId],);
  }


}
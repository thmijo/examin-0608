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
attemptId :string = null;
attemptIdArreay : any = [];
attemptArray : any = [];
flag : boolean = false;
uId : string = "arHiJ1xEbfjTRJbNnstz";
value : string = "temp";

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

  if(this.attemptId==null) {
      this.userService.createAttempt().then(docRef => {
      this.attemptIdArreay.push(docRef.id);
      this.attemptId = docRef.id;
      console.log("attempt written with ID: ", docRef.id);      
      this.userService.updateAttemptInUserCollection(this.uId,this.attemptId);
      }).catch( reason => {
        console.log(" errr "+ reason);
      });
  } 

  this.currentQuestionIndex = i;
  console.log("geting question"+i+ "  "+this.questionIDs[i]);
    this.questionService.getQuestion(this.questionIDs[i]).then(doc => {
       console.log (doc.data());
       this.question = doc.data();
    }); 
  }  


  rbClick(i:number,selectedOption:string) {
    console.log ("value"+ this.value);
   // console.log ("radio button @@@"+this.signupForm.value.Option);
    console.log ("radio button clicked"+selectedOption);
    console.log ("radio button answer"+this.questionIDs[i]);
     console.log ("radio button answer"+this.attemptId);
    const tempattempt = {
     qId: this.questionIDs[i],
     ans : this.question.ans,
     sel : selectedOption
    };
  //   this.questions[i].sel = selectedOption;
    this.attemptArray[i] = tempattempt;
    console.log(this.attemptArray);
    this.userService.updateAttempt(this.attemptId,this.attemptArray);
    //update attempt table with id
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

  submitExam() {
   this.router.navigate(['/results/'+this.uId],);
  }


}
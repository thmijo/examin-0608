import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() q : string;
  @Input() o1 : string;
  @Input() o2 : string;
  @Input() o3 : string;
  @Input() qId : string;
  constructor() { }

  ngOnInit() {
  }

}
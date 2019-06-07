import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { QuestionPaperComponent } from './question-paper/question-paper.component';
import { QuestionService } from './shared/question.service';
import { HeaderComponent } from './ui/header/header.component';
import { ExamService } from './shared/exam.service';
import { ExamComponent } from './exam/exam.component';
import { QuestionComponent } from './question-paper/question/question.component';
import { UserComponent } from './user/user.component';
import { UserService } from './shared/user.service';
import { ResultsComponent } from './results/results.component';
import { ResultsService } from './shared/results.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule,AngularFireModule.initializeApp(environment.firebase),
 	AngularFirestoreModule,AppRoutingModule ],
  declarations: [ AppComponent, HelloComponent, QuestionPaperComponent, HeaderComponent, ExamComponent, QuestionComponent, UserComponent, ResultsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [QuestionService, ExamService, UserService, ResultsService]
})
export class AppModule { }

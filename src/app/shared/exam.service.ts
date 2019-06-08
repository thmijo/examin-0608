import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Exam } from "./interfaces/exam";

@Injectable({
  providedIn: "root"
})
export class ExamService {
  examCollection: AngularFirestoreCollection;
  examDocument: AngularFirestoreDocument;
  questionCollection : AngularFirestoreCollection;
 //firebase : AngularFirestore;
  questRef : string;
 // Qid : string;
  eId : string;
  qArray : string[] = [];

  constructor(private afs: AngularFirestore) {}

  getExams(): Observable<any[]> {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    this.examCollection = this.afs.collection(`exams`);
    this.questionCollection = this.afs.collection('questions');

    //console.log(this.questionCollection);

    return this.examCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return { ...data };
        })
      )
      //,
      //tap(data => console.log(JSON.stringify(data)))
    );
  }

  getExam(eId: string) {
    return this.afs.doc(`exams/${eId}`);
  }

  addExam() { 
    const attempt = {
     time: new Date(),
    };
    console.log("adding dummy exam1");
    this.examCollection.add(attempt).then(docRef => {
    this.eId = docRef.id;
    console.log("Exam written with ID: ", docRef.id);   
    }).catch( reason => {
     console.log(" errr "+ reason);
    });
  }

  loadQuestions(eId) {
    this.eId = eId;
    this.qArray = [];
    //let QId : string  [];
    var batch = this.afs.firestore.batch(); 
    const db = this.afs.firestore;
    
    const ref = db.collection('questions').doc();
    const id = ref.id;
    this.qArray.push(id);
    var newCityRef = this.questionCollection.doc(id).ref;
    batch.set(newCityRef, { q: 'What is Captial of 1',o1: 'Option1',o2: 'Option1',o3: 'Option1',ans:'o1'});

    const ref1 = db.collection('questions').doc();
    const id1 = ref1.id;
    this.qArray.push(id1);
    var newCityRef1 = this.questionCollection.doc(id1).ref;
    batch.set(newCityRef1, { q: 'What is Captial of 1',o1: 'Option1',o2: 'Option1',o3: 'Option1',ans:'o1'});

    batch.commit().then( () => {
     console.log ("batching "+this.qArray);
     this.getExam(this.eId).set({ questionRef : this.qArray });
    });

  }  
  addExam_Backup() {
    //eId : string;
    const attempt = {
    //  testMame : "Sample Test",
      time: new Date(),
    //  dArray :  ['hello','Bolo','Maylo','Julo'],
    //  dMap : { 'Environments' : 'Bro', 'servers':'Sis'}  
    };
    
    //console.log("adding atempt for "+uId);
   //this.attemptsCollection = this.afs.collection(`users);

   this.examCollection.add(attempt).then(docRef => {
   this.eId = docRef.id;
   console.log("Exam written with ID: ", docRef.id);
        this.addQuestion().then((quest) => {
            console.log(this.eId+"Question written with ID: ", quest.id)
            this.qArray.push(quest.id);
          });
   });
   console.log(" array @@@ ", this.qArray);
    
    // console.log(this.examCollection.add(attempt));
  }

  addQuestion_backup() {
    questRef : "";
    const question = {
      q1: "What is Co2",
      o1: "Car",
      o2: "Scoo",
      o3: "Bus",
      ans: "o1"
    };
    return this.questionCollection.add(question);
  }  

  deleteExam(eId:string) {
    return this.afs.doc(`exams/${eId}`).delete();
  }

}

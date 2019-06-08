import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Question } from "./interfaces/question";

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  questionCollection: AngularFirestoreCollection;
  questionDocument: AngularFirestoreDocument;

  constructor(private afs: AngularFirestore) {}

   getQuestion(qId: string) {
  //  return this.afs.doc(`questions/${qId}`);
     const db = this.afs.firestore;
     return db.collection('questions').doc(qId).get();
  }

  getExamQuestion(eId:string) {

  const db = this.afs.firestore;
  return db.collection('exams').doc(eId).get();

/*  var getDoc = cityRef.get().then(doc => {
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
  })
  .catch(err => {
  console.log('Error getting document', err);
  }); */
  }

  getExamQuestion1(eId: string) {
   console.log("getExamQuestion");
    this.afs.firestore.collection('exams')
        .where('id','==', eId)
        .get()
        .then(querySnapshot => {
                
                querySnapshot.forEach(function (doc) {
                      console.log ("one more" );
                      console.log(doc.id); // id of doc
                      console.log(doc.data()); // data of doc
                })
         });
  }

 /* getQuestions(eId:string): Observable<any[]> {
    //console.log(userId);

    this.questionCollection = this.afs.collection(`exams/${eId}/questions`);

    //console.log(this.questionCollection);

    return this.questionCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return { ...data };
        })
      ),
      tap(data => console.log(JSON.stringify(data)))
    );
  } */

 
}

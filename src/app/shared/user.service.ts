import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Question } from "./interfaces/question";
//import { firestore } from 'firebase';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: "root"
})
export class UserService {
  userCollection: AngularFirestoreCollection;
  userDocument: AngularFirestoreDocument;
  usersCollection: AngularFirestoreCollection = this.afs.collection('users');
  attemptsCollection: AngularFirestoreCollection = this.afs.collection('attempts');
  attemptDocument: AngularFirestoreDocument;
  attemptId : string;


  constructor(private afs: AngularFirestore ) {}

 getUsers(): Observable<any[]> {
  //getQuestions(eId:string): Observable<any[]> {
    //console.log(userId);

    this.userCollection = this.afs.collection(`users`);

    //console.log(this.questionCollection);

    return this.userCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return { ...data };
        })
      ),
      tap(data => console.log(JSON.stringify(data)))
    );
  }
 /* getUserAttempts(uId:string): Observable<any[]> {
  //getQuestions(eId:string): Observable<any[]> {
    //console.log(userId);

  
    console.log("Logging UId from service "+uId);
    this.attemptsCollection = this.afs.collection(`users/${uId}/attempts`);


    return this.attemptsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return { ...data };
        })
      ),
      tap(data => console.log(JSON.stringify(data)))
    );
  }*/

createAttempt() {
    const attempt = {
     time: new Date(),
    };
    console.log("adding dummy attempt");
    return this.attemptsCollection.add(attempt)
}

updateAttempt(aId :string, attemptArray : string []) {
  console.log("array size ="+attemptArray.length);
  const newCity = {
      time: attemptArray
  };
  this.afs.doc(`attempts/${aId}`).set({"attemptDetails" : attemptArray});
}

updateAttemptInUserCollection(uId:string,attemptId:string){
  const newCity = {
      time: new Date()
    };

       // this.afs.doc(`users/${uId}`).set({"attemptDetails" : attemptIdArreay});

    this.afs.doc(`users/${uId}`).ref.update({"attemptDetails": firebase.firestore.FieldValue.arrayUnion(attemptId)})

  console.log("updateAttemptInUserCollection");
     
       


}
/*addUserAttempts(uId:string) {
    const attempt = {
      test : "Test attempt 333",
      time: new Date(),
      dArray :  ['hello','Bolo','Maylo','Julo'],
      dMap : { 'Environments' : 'Bro', 'servers':'Sis'}  
    };
    console.log("adding atempt for "+uId);
   //this.attemptsCollection = this.afs.collection(`users);
      return this.attemptsCollection.doc(uId).collection("attempts").add(attempt);
}
  //getQuestion(qId: string) {
  //  return this.afs.doc(`questions/${qId}`);
  //} */

/*addUserAttempts2(uId:string, questions : any[]) {
    const attempt = {
     // test : "Test attempt 333",
     // time: new Date(),
     // dArray :  ['hello','Bolo','Maylo','Julo'],
     // dMap : { 'Environments' : 'Bro', 'servers':'Sis'} ,
      attemptDetails :  questions
    };
    console.log("adding atempt for "+uId);
   //this.attemptsCollection = this.afs.collection(`users);
      return this.attemptsCollection.doc(uId).collection("attempts").add(attempt);
} */
  //getQuestion(qId: string) {
  //  return this.afs.doc(`questions/${qId}`);
  //}
}

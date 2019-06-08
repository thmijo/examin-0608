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
export class ResultsService {
  userCollection: AngularFirestoreCollection;
  userDocument: AngularFirestoreDocument;
  attemptsCollection: AngularFirestoreCollection = this.afs.collection('users');
  attemptDocument: AngularFirestoreDocument;

  constructor(private afs: AngularFirestore) {}

  getUserAttemptIDs(uId:string) {
      const db = this.afs.firestore;
      return db.collection('users').doc(uId).get();
  }

  getAttemptDetails(aId:string) {
      const db = this.afs.firestore;
      return db.collection('attempts').doc(aId).get();
  }

  getUserAttempts(uId:string): Observable<any[]> {
  
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
  }
}
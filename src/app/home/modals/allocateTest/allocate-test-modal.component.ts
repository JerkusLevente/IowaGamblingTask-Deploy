import { Component } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import * as admin from 'firebase-admin';
import { AuthService } from "src/app/auth/auth.service";
import { HomeService } from "../../home.service";
import { HomePage } from "../../home.page";
import { AngularFirestore, DocumentData } from "@angular/fire/compat/firestore";


@Component({
    selector: 'app-allocate-test-modal',
    template: `
      <ion-header>
        <ion-toolbar>
          <ion-title>Allocate test to user {{ userEmail }}</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="dismiss()">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
      <form (submit)="allocateTest()">
      <ion-item>
          <ion-label position="floating">Test Name</ion-label>
          <ion-input name="testName" [(ngModel)]="testName"></ion-input>
        </ion-item>  
      <ion-item>
          <ion-label position="floating">Number Of Steps</ion-label>
          <ion-input name="numberOfSteps" [(ngModel)]="numberOfSteps"></ion-input>
        </ion-item>
        <ion-list>
        <ion-item *ngFor="let deck of decks">
          <ion-checkbox [(ngModel)]="deck.completed" (ionChange)="toggleDeckSelection(deck.id)"></ion-checkbox>
          <h2>{{ deck.name }}</h2>
        </ion-item>
        </ion-list>
        <ion-button expand="full" type="submit">Allocate test</ion-button>
      </form>
      </ion-content>
    `
  })
  export class AllocateTestModalComponent {
    users: any[] = [];
    userEmail: string;
    numberOfSteps: number;
    decks: any;
    selectedDecks: string[] = [];
    testName: string;

    constructor(
      private modalCtrl: ModalController,
      private navParams: NavParams,
      private authService: AuthService,
      private homeService: HomeService,
      private firestore: AngularFirestore,
    ) { 
      this.numberOfSteps = 0;
      this.testName = "";
      this.userEmail = navParams.get('userEmail');
      this.listDecks();
    }
    
    allocateTest(){
      const currentDate: Date = new Date();
      const exampleTest={
        DateIssued: currentDate,
        DateTaken: "",
        Decks: this.selectedDecks,
        Issuer: this.authService.getUserEmail(),
        Participant: this.userEmail,
        numberOfSteps: this.numberOfSteps,
        taken: false,
        testName:this.testName,
      }
      this.homeService.createTest(exampleTest);
      this.dismiss();
    }
    
    toggleDeckSelection(deckId: string) {
      const index = this.selectedDecks.indexOf(deckId);
      if (index === -1) {
        this.selectedDecks.push(deckId);
      } else {
        this.selectedDecks.splice(index, 1);
      }
    }

    listDecks() {
      this.homeService.getDecks().subscribe(data => {
        this.decks = data.map(item => {
          const deckId = item.payload.doc.id;
          const deckData = item.payload.doc.data() as DocumentData; // Cast deckData to DocumentData
          const deckName = deckData["deckName"]; // Replace 'deckName' with the actual field name in your Firestore document
          return { id: deckId, name: deckName };
        });
      });
    }

    getDeckById(documentId: string): Promise<any> {
      const documentRef = this.firestore.collection('Decks').doc(documentId);
      return documentRef.get().toPromise();
    }

    getDeckNameById(documentId: string, testName: string): Promise<any> {
      return this.getDeckById(documentId).then(
        documentData => documentData.get(testName)
      );
    }

      dismiss() {
        this.modalCtrl.dismiss();
      }
    
  }
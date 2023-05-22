import { Component } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HomeService } from "../home.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
    selector: 'app-add-card-modal',
    template: `
      <ion-header>
        <ion-toolbar>
          <ion-title>Add Card to Deck named {{ deckName }}</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="dismiss()">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
      <form (submit)="addCard()">
        <ion-item>
          <ion-label position="floating">Gain</ion-label>
          <ion-input name="gain" [(ngModel)]="gain"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Loss</ion-label>
          <ion-input name="loss" [(ngModel)]="loss"></ion-input>
        </ion-item>
        <ion-button  expand="full" type="submit">Add Card</ion-button>
      </form>
      </ion-content>
    `
  })
  export class AddCardModalComponent {

    gain: number;
    loss: number;
    deckId: string;
    deckName: string='';

    constructor(
      private modalCtrl: ModalController,
      private navParams: NavParams,
      private homeService: HomeService,
      private firestore: AngularFirestore,
    ) { 
      this.gain = 0;
      this.loss = 0;
      this.deckId = navParams.get('deckId');
      this.getDeckNameById(this.deckId,"deckName").then(
        fieldValue => {
          this.deckName= fieldValue;
        }
      );
    }
  
    dismiss() {
      this.modalCtrl.dismiss();
    }
  
    addCard() {
      const exampleCard={
        deckID: this.deckId,
        gain: this.gain,
        loss: this.loss,
    }

      this.homeService.createCard(exampleCard);
      this.dismiss();
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

  }
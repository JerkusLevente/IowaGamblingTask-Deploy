import { Component } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HomeService } from "../home.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
    selector: 'app-list-cards-modal',
    template: `
      <ion-header>
        <ion-toolbar>
          <ion-title>Cards Included in the Deck {{ deckName }}</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="dismiss()">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
      <ng-container *ngIf="cards.length; else noCards">
        <ion-list>
          <ion-item *ngFor="let card of cards">
          <h2 class="gain">Gain: {{ card.payload.doc.data().gain }}</h2>
          <h2 class="loss">Loss: {{ card.payload.doc.data().loss  }}</h2>
          <ion-button (click)="deleteCard(card.payload.doc.id)">Delete</ion-button>
          </ion-item>
        </ion-list>
      </ng-container>
      <ng-template #noCards>
      <div class="no-cards-text">
        <h2>This deck is empty.</h2>
      </div>
      </ng-template>
    </ion-content>
    `,
    styles: [`
    ion-item {
      display: flex;
      align-items: center;
    }

    .gain {
      flex: 1;
      text-align: left;
    }

    .loss {
      flex: 1;
      text-align: center;
    }
      .no-cards-text {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

    `]
  })
  export class ListCardsModalComponent {
    deckId: string;
    cards: any[] = [];
    deckName: string='';

    constructor(
      private modalCtrl: ModalController,
      private navParams: NavParams,
      private homeService: HomeService,
      private firestore: AngularFirestore,
    ) { 
      this.deckId = navParams.get('deckId');
      this.listCards();
      this.getDeckNameById(this.deckId,"deckName").then(
        fieldValue => {
          this.deckName= fieldValue;
        }
      );

      
    }
  
    dismiss() {
      this.modalCtrl.dismiss();
    }
  
    

    listCards(){
      this.homeService.getCardsByID(this.deckId).subscribe(data => {
        this.cards = data;
      });
    }

    deleteCard(cardId: string) {
      this.homeService.deleteCard(cardId)
    .then(() => {
      console.log('Card deleted successfully!');
    })
    .catch(error => {
      console.log('Error deleting card:', error);
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

  }
import { Component } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HomeService } from "../home.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-add-deck-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Create new deck</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form (submit)="addDeck()">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="floating">Deck Name</ion-label>
                <ion-input name="name" [(ngModel)]="name"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button type="submit" expand="full">Create Deck</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-content>
  `
})
  export class AddDeckModalComponent {

    name: string;
  
    constructor(
      private modalCtrl: ModalController,
      private navParams: NavParams,
      private homeService: HomeService,
      private authService: AuthService
    ) { 
      this.name = "";
    }
  
    dismiss() {
      this.modalCtrl.dismiss();
    }
  
    addDeck() {
        const exampleDeck={
        deckName: this.name,
        deckOwner:this.authService.getUserEmail(),
        }

      this.homeService.createDeck(exampleDeck);
      this.dismiss();
    }
  }
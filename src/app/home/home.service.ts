import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { AddCardModalComponent } from './modals/add-card-modal.component';
import {  ListUsersModalComponent } from './modals/list-users-modal.component';
import {  ListCardsModalComponent } from './modals/list-cards-modal.component';
import { AuthService } from '../auth/auth.service';
import { AddDeckModalComponent } from './modals/add-deck-modal.component';
import { ListTestDetailsModalComponent } from './modals/list-test-details-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  constructor(
    private firestore: AngularFirestore,
    private modalCtrl: ModalController,
    private authService: AuthService,
    ) { }

    createCard(data: any) {
      return new Promise<any>((resolve, reject) =>{
        this.firestore
        .collection("Cards")
        .add(data)
            .then(res => {}, err => reject(err));
    });
    }

    deleteCard(cardId: string) {
      return new Promise<any>((resolve, reject) => {
        this.firestore
          .collection("Cards")
          .doc(cardId)
          .delete()
          .then(res => resolve(res), err => reject(err));
      });
    }

  createDeck(data: any) {
    return new Promise<any>((resolve, reject) =>{
      const deckRef = this.firestore.collection('Decks').doc();
      this.firestore
      .collection("Decks")
      .add(data)
      .then(res => {}, err => reject(err));
    });
  }

  createTest(data:any){
    return new Promise<any>((resolve, reject) =>{
      const deckRef = this.firestore.collection('Tests').doc();
      this.firestore
      .collection("Tests")
      .add(data)
      .then(res => {}, err => reject(err));
    });
  }

  getDecks() { 
    return this.firestore.collection("Decks", ref => ref.where("deckOwner", "==", this.authService.getUserEmail())).snapshotChanges();
  }

  getCardsByID(deckID:string){
    return this.firestore.collection("Cards", ref => ref.where("deckID", "==", deckID)).snapshotChanges();
  }

  getUserEmails() { 
    return this.firestore.collection("Users").snapshotChanges();
  }

  getCardsOfTheDeck(deckID: string) {
    return this.firestore.collection("Cards", ref => ref.where("deckID", "==", deckID)).snapshotChanges();
  }
  
  getStepsOfTest(testID: string) {
    return this.firestore.collection("Steps", ref => ref.where("testID", "==", testID)).snapshotChanges();
  }

  async addCardToDeck(deckId: string) {
    const modal = await this.modalCtrl.create({
      component: AddCardModalComponent,
      cssClass: 'add-card-modal',
      componentProps: {
        deckId: deckId,
      }
    });
    return await modal.present();
  }
  
  async listAllCardsOfTheDeck(deckId: string) {
    const modal = await this.modalCtrl.create({
      component: ListCardsModalComponent,
      componentProps: {
        deckId: deckId
      }
    });
    return await modal.present();
  }

  async listDetailsOfTest(testId: string) {
    const modal = await this.modalCtrl.create({
      component: ListTestDetailsModalComponent,
      cssClass: 'list-details-modal',
      componentProps: {
        testId: testId
      }
    });
    return await modal.present();
  }

  async listUsers() {
    const modal = await this.modalCtrl.create({
      component: ListUsersModalComponent,
      componentProps: {
      }
    });
    return await modal.present();
  }

  async addDeck() {
    const modal = await this.modalCtrl.create({
      component: AddDeckModalComponent,
      cssClass: 'add-deck-modal',
      componentProps: {
      }
    });
    return await modal.present();
  }

  getTestsAllocatedByMe() {
    return this.firestore.collection("Tests", ref => ref.where("Issuer", "==", this.authService.getUserEmail())
                                                        .where("taken", "==", true)).snapshotChanges();
  }

  getTestsAllocatedToMe() {
    return this.firestore.collection("Tests", ref => ref.where("Participant", "==", this.authService.getUserEmail())
                                                        .where("taken", "==", false)).snapshotChanges();
  }

  getTestNameById(testId: string) {
    return this.firestore.collection("Tests", ref => ref.where("Issuer", "==", this.authService.getUserEmail())).snapshotChanges();
  }

  
}

export interface Card {
  deckID: string;
  gain: number;
  loss: number;
}




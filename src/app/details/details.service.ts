import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ListCardsModalComponent } from './modals/list-cards-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  
  testName: string='';
  
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private firestore: AngularFirestore,
    ) { }
    
  getStepsOfTest(testID: string) {
    return this.firestore.collection("Steps", ref => ref.where("testID", "==", testID)).snapshotChanges();
  }
  
  close(){
    this.router.navigate(['/home']);
  }
  
  getTestNameById(documentId: string, testName: string): Promise<any> {
    return this.getTestById(documentId).then(
      documentData => documentData.get(testName)
      );
    }
    
    getTestById(documentId: string): Promise<any> {
      const documentRef = this.firestore.collection('Tests').doc(documentId);
      return documentRef.get().toPromise();
    }
    
    getTestDecksById(documentId: string, decks:string): Promise<any>{
      return this.getTestById(documentId).then(
        documentData=>documentData.get(decks)
        );
      }
      
      getDeckNameByDeckID(documentId: string): Promise<any>{
        return this.getDeckByID(documentId).then(
          documentData=>documentData.get("deckName")
    );
  }

  getDeckByID(documentId: string): Promise<any> {
    const documentRef = this.firestore.collection('Decks').doc(documentId);
    return documentRef.get().toPromise();
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
  
  countChoices(steps: any): number[] {
   let numberOfTimesDecksChosen: number[]=[];
   let deckOneCounter:number = 0;
   let deckTwoCounter:number = 0;
   let deckThreeCounter:number = 0;
   let deckFourCounter:number = 0;
   

    for (let step of steps) {
      if(step.choosenDeckNumber == 1){
        deckOneCounter++;
      }
      if(step.choosenDeckNumber == 2){
        deckTwoCounter++;
      }
      if(step.choosenDeckNumber == 3){
        deckThreeCounter++;
      }
      if(step.choosenDeckNumber == 4){
        deckFourCounter++;
      }
    }
    numberOfTimesDecksChosen = [deckOneCounter,deckTwoCounter,deckThreeCounter,deckFourCounter];
    return numberOfTimesDecksChosen;
  }
  
  countHoverTimes(steps: any): number[] {
    let hoverTimesOnDecks: number[]=[];
    let hoverTimeOnDeckOne:number = 0;
    let hoverTimeOnDeckTwo:number = 0;
    let hoverTimeOnDeckThree:number = 0;
    let hoverTimeOnDeckFour:number = 0;
    
 
     for (let step of steps) {
      for(let i=0; i < step.buttonHovers.length; i++){
        if(step.buttonHovers[i].deckNumber == "Deck 1"){
          hoverTimeOnDeckOne=hoverTimeOnDeckOne+ step.buttonHovers[i].hoverTime;
        }
        if(step.buttonHovers[i].deckNumber == "Deck 2"){
          hoverTimeOnDeckTwo=hoverTimeOnDeckTwo + step.buttonHovers[i].hoverTime;
        }
        if(step.buttonHovers[i].deckNumber == "Deck 3"){
          hoverTimeOnDeckThree=hoverTimeOnDeckThree+ step.buttonHovers[i].hoverTime;
        }
        if(step.buttonHovers[i].deckNumber == "Deck 4"){
          hoverTimeOnDeckFour=hoverTimeOnDeckFour+ step.buttonHovers[i].hoverTime;
        }
      }
     }
     hoverTimesOnDecks = [hoverTimeOnDeckOne,hoverTimeOnDeckTwo,hoverTimeOnDeckThree,hoverTimeOnDeckFour];
     return hoverTimesOnDecks;
   }

  getStepById(testID: string) {
    return this.firestore.collection("Steps", ref => ref.where("testID", "==", testID)).snapshotChanges();
  }

}

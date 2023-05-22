import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { HomeService } from '../home/home.service';
import * as firebase from 'firebase/compat';
@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  testId!: string;
  testName: string='';
 
  numberOfSteps: number = 0;
  choosenDeck: number = 0;
 
  gain: number = 0;
  loss: number = 0;

  cashPile: number = 0;
  borrow: number = 0;

  cashPilePerMax=0;
  borrowPerMax=0;

  maxCashPileBorrow=0;

  totalGain: number = 0;
  
  Decks: string[]= [];
  deckOne: any[] = [];
  deckTwo: any[] = [];
  deckThree: any[] = [];
  deckFour: any[] = [];
  
  previouslyPickedCard: any;
  stepsTaken:number=0;
  startTime = Date.now();
  stepTime = Date.now();
  hoverStartTime= Date.now();
  hoverTime = Date.now();
  buttonHovers: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private homeService: HomeService,
    private router: Router,
    ) {
    }
    
    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.testId = params.get('testId') || '';
        this.getTestNameById(this.testId,"testName").then(
          fieldValue => {
            this.testName = fieldValue;
          }
        );
        
      const testDocRef = this.firestore.doc(`Tests/${this.testId}`);
      testDocRef.valueChanges().subscribe(testData => {
        
        const { numberOfSteps } = testData as { numberOfSteps: number };
        this.numberOfSteps = numberOfSteps;
        
        const { Decks } = testData as { Decks: string[] }; 
        this.Decks = Decks;
        this.fillDeckOne(this.Decks[0]);
        this.fillDeckTwo(this.Decks[1]);
        this.fillDeckThree(this.Decks[2]);
        this.fillDeckFour(this.Decks[3]);
      });
    });
  }

  fillDeckOne(deckID: string) {
    this.homeService.getCardsOfTheDeck(deckID).subscribe(cards => {
       this.deckOne = cards.map(card => card.payload.doc.data());
    });
  }

  fillDeckTwo(deckID: string) {
    this.homeService.getCardsOfTheDeck(deckID).subscribe(cards => {
       this.deckTwo = cards.map(card => card.payload.doc.data());
    });
  }

  fillDeckThree(deckID: string) {
    this.homeService.getCardsOfTheDeck(deckID).subscribe(cards => {
       this.deckThree = cards.map(card => card.payload.doc.data());
    });
  }

  fillDeckFour(deckID: string) {
    this.homeService.getCardsOfTheDeck(deckID).subscribe(cards => {
       this.deckFour = cards.map(card => card.payload.doc.data());
    });
  }
  
  pickFromDeckOne(){
    this.choosenDeck=1;
    const randomIndex = Math.floor(Math.random() * this.deckOne.length);
    this.previouslyPickedCard= this.deckOne[randomIndex];
    this.totalGain=this.totalGain+(parseFloat(this.previouslyPickedCard.gain)-parseFloat(this.previouslyPickedCard.loss));
    this.cashPile= this.cashPile+parseFloat(this.previouslyPickedCard.gain);
    this.borrow = this.borrow+parseFloat(this.previouslyPickedCard.loss);
    this.maxCashPileBorrow=this.cashPile+parseFloat(this.previouslyPickedCard.gain)+this.borrow+parseFloat(this.previouslyPickedCard.loss);
    this.cashPilePerMax=this.cashPile/this.maxCashPileBorrow;
    this.borrowPerMax=this.borrow/this.maxCashPileBorrow;
    this.stepsTaken++;
    const pickTime = Date.now()-this.stepTime;
    this.createStep(1,this.Decks[0],pickTime);
    this.stepTime = Date.now();
    this.buttonHovers = [];
    this.checkSteps();
  }

  pickFromDeckTwo(){
     this.choosenDeck=2;
     const randomIndex = Math.floor(Math.random() * this.deckTwo.length);
     this.previouslyPickedCard= this.deckTwo[randomIndex];
     this.totalGain=this.totalGain+(parseFloat(this.previouslyPickedCard.gain)-parseFloat(this.previouslyPickedCard.loss));
     this.cashPile= this.cashPile+parseFloat(this.previouslyPickedCard.gain);
     this.borrow = this.borrow+parseFloat(this.previouslyPickedCard.loss);
     this.maxCashPileBorrow=this.cashPile+parseFloat(this.previouslyPickedCard.gain)+this.borrow+parseFloat(this.previouslyPickedCard.loss);
     this.cashPilePerMax=this.cashPile/this.maxCashPileBorrow;
     this.borrowPerMax=this.borrow/this.maxCashPileBorrow;
     this.stepsTaken++;
     const pickTime = Date.now()-this.stepTime;
     this.createStep(2,this.Decks[1],pickTime);
     this.stepTime = Date.now();
     this.buttonHovers = [];
     this.checkSteps();
   }

   pickFromDeckThree(){
     this.choosenDeck=3;
     const randomIndex = Math.floor(Math.random() * this.deckThree.length);
     this.previouslyPickedCard = this.deckThree[randomIndex];
     this.totalGain=this.totalGain+(parseFloat(this.previouslyPickedCard.gain)-parseFloat(this.previouslyPickedCard.loss));
     this.cashPile= this.cashPile+parseFloat(this.previouslyPickedCard.gain);
     this.borrow = this.borrow+parseFloat(this.previouslyPickedCard.loss);
     this.maxCashPileBorrow=this.cashPile+parseFloat(this.previouslyPickedCard.gain)+this.borrow+parseFloat(this.previouslyPickedCard.loss);
     this.cashPilePerMax=this.cashPile/this.maxCashPileBorrow;
     this.borrowPerMax=this.borrow/this.maxCashPileBorrow;
     this.stepsTaken++;
     const pickTime = Date.now()-this.stepTime;
     this.createStep(3,this.Decks[2],pickTime);
     this.stepTime = Date.now();
     this.buttonHovers = [];
     this.checkSteps();
   }

   pickFromDeckFour(){
     this.choosenDeck=4;
     const randomIndex = Math.floor(Math.random() * this.deckFour.length);
     this.previouslyPickedCard = this.deckFour[randomIndex];
     this.totalGain=this.totalGain+(parseFloat(this.previouslyPickedCard.gain)-parseFloat(this.previouslyPickedCard.loss));
     this.cashPile= this.cashPile+parseFloat(this.previouslyPickedCard.gain);
     this.borrow = this.borrow+parseFloat(this.previouslyPickedCard.loss);
     this.maxCashPileBorrow=this.cashPile+parseFloat(this.previouslyPickedCard.gain)+this.borrow+parseFloat(this.previouslyPickedCard.loss);
     this.cashPilePerMax=this.cashPile/this.maxCashPileBorrow;
     this.borrowPerMax=this.borrow/this.maxCashPileBorrow;
     this.stepsTaken++;
     const pickTime = Date.now()-this.stepTime;
     this.createStep(4,this.Decks[3],pickTime);
     this.stepTime = Date.now();
     this.buttonHovers = [];
     this.checkSteps();
   }

  checkSteps(){
    if(this.stepsTaken>=this.numberOfSteps){
      const endTime = Date.now();
      const duration = endTime - this.startTime;
      console.log(duration)
      this.updateTakenField(this.testId, true, duration);
      this.router.navigate(['/home']);
    }
  }

  updateTakenField(docId: string, newValue: boolean, timeTaken: number): Promise<void> {
    return this.firestore.collection('Tests').doc(docId).update({ taken: newValue , timeTaken: timeTaken});
  }

  createStep(choosendeckNumber:number,choosenDeckID:string,stepTime:number){
    const step={
        testID: this.testId,
        totalGain: this.totalGain,
        choosenDeckNumber:choosendeckNumber,
        choosenDeckID:choosenDeckID,
        stepTime:stepTime,
        stepNumber: this.stepsTaken,
        buttonHovers: this.buttonHovers
        }
      return new Promise<any>((resolve, reject) =>{
        this.firestore
        .collection("Steps")
        .add(step)
            .then(res => {}, err => reject(err));
    });
  }

  onButtonHover(event: MouseEvent, buttonName: string) {
    this.hoverStartTime = Date.now();

  }
  
  onButtonLeave(buttonName: string) {
    this.hoverTime = Date.now()-this.hoverStartTime;
    
    const buttonHover ={
      deckNumber: buttonName,
      hoverTime: this.hoverTime,
    };

    this.buttonHovers.push(buttonHover);
  }

  getTestById(documentId: string): Promise<any> {
    const documentRef = this.firestore.collection('Tests').doc(documentId);
    return documentRef.get().toPromise();
  }

  getTestNameById(documentId: string, testName: string): Promise<any> {
    return this.getTestById(documentId).then(
      documentData => documentData.get(testName)
    );
  }

}

export interface Card {
  deckID: string;
  gain: number;
  loss: number;
}
export interface Step {
  testID: string;
  choosenDeck: number;
  currentTotalGain: number;
}


import { Component } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HomeService } from "../home.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
    selector: 'list-test-details-modal',
    template: `
    <ion-header>
    <ion-toolbar>
      <ion-title>{{ testName }}</ion-title>
      <ion-buttons slot="end">
        <ion-button (click)="dismiss()">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
          <ion-item-divider>
            <ion-label>Details of the Steps taken During the Test</ion-label>
          </ion-item-divider>
          <ion-grid>
            <ion-row>
            <ion-col>Decks used to Conduct the Test: </ion-col>
            <ion-col>{{ decks[0] }}</ion-col>
            <ion-col>{{ decks[1] }}</ion-col>
            <ion-col>{{ decks[2] }}</ion-col>
            <ion-col>{{ decks[3] }}</ion-col>
            </ion-row>
          </ion-grid>
        <ion-grid>
           <ion-row *ngFor="let step of steps">
            <ion-col> Step Number: {{ step.stepNumber }}</ion-col>
            <ion-col> Chosen Deck Number: {{ step.choosenDeckNumber }}</ion-col>
            <ion-col> Elapsed Time (milliseconds): {{ step.stepTime }} </ion-col> 
            <ion-col> Total Gain: {{ step.totalGain }} </ion-col> 
            <ion-grid>
              <ion-col *ngFor="let buttonHover of step.buttonHovers">
                <ion-row> Deck Number: {{ buttonHover.deckNumber }}</ion-row>
                <ion-row> Hover Time (milliseconds): {{ buttonHover.hoverTime }}</ion-row>
              </ion-col>
            </ion-grid>
            <ion-item-divider color="primary" size="sm" class="my-divider"></ion-item-divider>  
           </ion-row>
        </ion-grid>
  </ion-content>
    `
  })
  export class ListTestDetailsModalComponent {
    testId: string;
    testName: string='';
    steps: any[] = [];
    deckIDs: any[] =[];
    decks: any[] = [];

    constructor(
      private modalCtrl: ModalController,
      private navParams: NavParams,
      private homeService: HomeService,
      private firestore: AngularFirestore
    ) { 
      this.testId = navParams.get('testId');
      this.listSteps(this.testId);
      this.gettestNameById(this.testId,"testName").then(
        fieldValue => {
          this.testName= fieldValue;
        }
      );

      this.getTestDecksById(this.testId,"Decks").then(
        fieldValue => {
          this.deckIDs = fieldValue;
          for(let i=0;i<4;i++){
            this.getDeckNameByDeckID(this.deckIDs[i]).then(
              fieldValue=>{
                this.decks[i] = fieldValue;
              }
            );
          };
        }
      );

    }
  
    dismiss() {
      this.modalCtrl.dismiss();
    }
  
    listSteps(testId: string) {
      this.homeService.getStepsOfTest(testId).subscribe(steps => {
         this.steps = steps.map(step => step.payload.doc.data());
         this.steps.sort((a, b) => a.stepNumber - b.stepNumber);
      });
    }

    getTestById(documentId: string): Promise<any> {
      const documentRef = this.firestore.collection('Tests').doc(documentId);
      return documentRef.get().toPromise();
    }

    gettestNameById(documentId: string, testName: string): Promise<any> {
      return this.getTestById(documentId).then(
        documentData => documentData.get(testName)
      );
    }

    getTestDecksById(documentId: string, decks:string): Promise<any>{
      return this.getTestById(documentId).then(
        documentData=>documentData.get(decks)
      );
    }

    getDeckByID(documentId: string): Promise<any> {
      const documentRef = this.firestore.collection('Decks').doc(documentId);
      return documentRef.get().toPromise();
    }

    getDeckNameByDeckID(documentId: string): Promise<any>{
      return this.getDeckByID(documentId).then(
        documentData=>documentData.get("deckName")
      );
    }


  }
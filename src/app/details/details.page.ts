import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { NgFor } from '@angular/common';

import 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  testName: string='';
  testID!: string;
  steps: any[] = [];
  DeckIDs: string[]= [];
  deckNames: string[]=[];
  decksChoosen: number[]=[];
  hoverTimes: any;

  constructor(
    private detailsService: DetailsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.testID = params.get('testId') || '';
    });  
    this.detailsService.getTestNameById(this.testID,"testName").then(
      fieldValue => {
        this.testName = fieldValue;
      }
    );

    this.detailsService.getTestDecksById(this.testID,"Decks").then(
      fieldValue => {
        this.DeckIDs = fieldValue;
        for(let i=0;i<4;i++){
          this.detailsService.getDeckNameByDeckID(this.DeckIDs[i]).then(
            fieldValue=>{
              this.deckNames[i] = fieldValue;
            }
          );
        };
      }
    );
    
    this.listSteps(this.testID);
    
  }
  
  
  
  listSteps(testId: string) {
    this.detailsService.getStepsOfTest(testId).subscribe(steps => {
      this.steps = steps.map(step => step.payload.doc.data());
      this.steps.sort((a, b) => a.stepNumber - b.stepNumber);
      this.decksChoosen = this.detailsService.countChoices(this.steps);
      this.hoverTimes = this.detailsService.countHoverTimes(this.steps);
      const ctx = document.getElementById('favoredChoosingChart') as HTMLCanvasElement;
      const ctx2 = document.getElementById('favoredHoversChart') as HTMLCanvasElement;
      if(ctx){
        const chart = new Chart(ctx, {
          type: 'pie',
      data: {
      labels: this.deckNames,
      datasets: [{
        data: this.decksChoosen,
        backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            plugins: {
              datalabels: {
                formatter: (value, ctx) => {
                  const label = this.deckNames[ctx.dataIndex];
                  return `${label}: ${value}`;
                }
              }
            }
          }
        });
      }
      
      if(ctx2){
        const chart2 = new Chart(ctx2, {
          type: 'pie',
      data: {
      labels: this.deckNames,
      datasets: [{
        data: this.hoverTimes,
        backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          }
        });
      }

    });
  }

  listCards(DeckID: string){
    this.detailsService.listAllCardsOfTheDeck(DeckID);
  }

  close(){
    this.detailsService.close();
  }
}

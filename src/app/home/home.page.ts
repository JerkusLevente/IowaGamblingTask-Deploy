import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HomeService } from './home.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  decks: any;
  tests: any;
  cards: any;
  hasAllocatedTests = false;
  hasDetails=false;
  showDecks=false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private homeService: HomeService
  ) {
  } 

  public currentUserEmail = this.authService.getUserEmail();
  

  startTheTest(){
    this.router.navigateByUrl('/task');
  }

  addCard(){
    this.homeService.createCard(exampleCard);
  }

  addDeck(){
    this.homeService.addDeck();
  }

  listUsers(){
    this.homeService.listUsers();
  }

  addCardToDeck(deckID: string) {
    this.homeService.addCardToDeck(deckID);
  }

  listAllCardsOfTheDeck(deckID: string) {
    this.homeService.listAllCardsOfTheDeck(deckID);
  }

  listDecks(){
    this.homeService.getDecks().subscribe(data => {
      this.decks = data;
      this.hasAllocatedTests = true;
    });
    this.showDecks=true;
  }

  listTestsAllocatedByMe(){
    this.homeService.getTestsAllocatedByMe().subscribe(data => {
      this.tests = data;
      this.hasAllocatedTests = false;
      this.hasDetails=true;
      this.showDecks=false;
    });
  }

  listTestsAllocatedToMe(){
    this.homeService.getTestsAllocatedToMe().subscribe(data => {
      this.tests = data;
      this.hasAllocatedTests = true;
      this.hasDetails=false;
      this.showDecks=false;
    });
  }

  startTest(testId: string) {
    this.router.navigate(['/task', testId]);
  }

  viewDetails(testId: string){
    this.router.navigate(['/details', testId]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}

const exampleCard={
 gain: 20,
 loss: 15,
}
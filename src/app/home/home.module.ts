import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { AddCardModalComponent } from './modals/add-card-modal.component';
import { ListCardsModalComponent } from './modals/list-cards-modal.component';
import { ListUsersModalComponent } from './modals/list-users-modal.component';
import { AllocateTestModalComponent } from './modals/allocateTest/allocate-test-modal.component';
import { AddDeckModalComponent } from './modals/add-deck-modal.component';
import { ListTestDetailsModalComponent } from './modals/list-test-details-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,AddCardModalComponent,ListCardsModalComponent,ListUsersModalComponent,AllocateTestModalComponent, AddDeckModalComponent,ListTestDetailsModalComponent]
})
export class HomePageModule {}

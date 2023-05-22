import { Component } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HomeService } from "../home.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import * as admin from 'firebase-admin';
import { AllocateTestModalComponent } from "./allocateTest/allocate-test-modal.component";

@Component({
    selector: 'app-list-users-modal',
    template: `
      <ion-header>
        <ion-toolbar>
          <ion-title>Users</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="dismiss()">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
      <ion-list>
        <ion-item *ngFor="let user of users">
          <h2>{{ user.email }}</h2>
          <ion-button slot="end" (click)="allocateTest(user.email)">Allocate Test</ion-button>
        </ion-item>
      </ion-list>
      </ion-content>
    `
  })
  export class ListUsersModalComponent {
    users: any[] = [];

    constructor(
      private modalCtrl: ModalController,
      private navParams: NavParams,
      private homeService: HomeService,
      private afAuth: AngularFireAuth
    ) { 
      this.listUsers();
    }
  
    
    dismiss() {
      this.modalCtrl.dismiss();
    }
  
    listUsers() {
      this.homeService.getUserEmails().subscribe(users => {
        this.users = users.map(user => user.payload.doc.data());
     });
    }

    async allocateTest(userEmail: string) {
      const modal = await this.modalCtrl.create({
        component: AllocateTestModalComponent,
        componentProps: {
          userEmail: userEmail,
          cssClass: 'allocate-test-modal',
        }
      });
      return await modal.present();
    }
    
  }
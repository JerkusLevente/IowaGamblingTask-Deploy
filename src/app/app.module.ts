import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import * as firebase from 'firebase/compat';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import * as admin from 'firebase-admin';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    AngularFireAuthModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

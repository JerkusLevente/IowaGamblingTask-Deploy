import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HomeService } from './home/home.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private homeService: HomeService
    ) {}
}

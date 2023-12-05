import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((userData) => {
      this.user = userData;
    });
  }

  onStockBtnClick() {
    this.router.navigate(['/view-stock']);
  }

  onProfileBtnClick() {
    this.router.navigate(['/user-profile']);
  }
}

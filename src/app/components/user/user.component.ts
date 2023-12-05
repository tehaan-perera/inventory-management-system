import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userObject: any;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe((userData) => {
        this.userObject = userData;
        //console.log(this.userObject);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { sha256 } from 'js-sha256';

import { SqlService } from '../../services/sql.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Form data variables
  LoginForm: FormGroup = new FormGroup({});
  username: FormControl = new FormControl();
  password: FormControl = new FormControl();
  loginInfo?: any = {};

  // Failed login variable (used to display alert)
  failedLogin: boolean = false;
  // Alert variables
  alertButton = ['OK'];
  alertHeader: string = 'Login Failed';
  alertSubHeader: string = 'Please try again';
  alertMessage: string = 'Username or Password is incorrect';

  constructor(private sqlService: SqlService, private router: Router) {}

  ngOnInit() {
    localStorage.clear();
    this.username.setValidators([Validators.required, Validators.minLength(4)]);
    this.password.setValidators([Validators.required, Validators.minLength(4)]);
  }

  onLoginSql() {
    const passwordHash = sha256(this.password.value);
    this.loginInfo.username = this.username.value;
    this.loginInfo.password = passwordHash;

    this.loginInfo = {
      params: new HttpParams()
        .set('username', this.username.value)
        .set('password', passwordHash),
    };

    this.sqlService
      .getLoginDetails(this.loginInfo)
      .subscribe((response: any) => {
        if (response.ok == true) {
          localStorage.setItem('currentUser', this.username.value);
          localStorage.setItem('isLoggedIn', 'true');
          this.LoginForm.reset();
          this.router.navigate(['/home']);
        } else {
          this.alertHeader = 'Login Failed';
          this.alertSubHeader = 'Please try again';
          this.alertMessage = 'Username or password is incorrect';
          this.failedLogin = true;
        }
      });
  }
}

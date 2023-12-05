import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SqlService } from '../../services/sql.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss'],
})
export class AddStockComponent implements OnInit {
  // Current user variable
  user : any;
  // Form data variables
  AddStockForm: FormGroup = new FormGroup({});
  stockName: FormControl = new FormControl();
  stockCode: FormControl = new FormControl();
  stockDesc: FormControl = new FormControl();
  stockQty: FormControl = new FormControl();
  stockItem?: any = {};
  // Alert variables
  isAlertOpen: boolean = false;
  alertMessage?: string;
  alertButton = ['OK'];
  alertHeader?: string;

  constructor(
    private sqlService: SqlService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated$){
      this.auth.user$.subscribe((userData) => {
        this.user = userData;
      })
    }
    // Form data validators
    this.stockCode.setValidators([
      Validators.required,
      Validators.maxLength(10),
    ]);
    this.stockName.setValidators([
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.stockDesc.setValidators([Validators.maxLength(50)]);
    this.stockQty.setValidators([
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]);
  }

  onSubmit() {
    this.stockItem.stockCode = this.stockCode.value;
    this.stockItem.stockName = this.stockName.value;
    this.stockItem.stockDesc = this.stockDesc.value;
    this.stockItem.stockQty = this.stockQty.value;

    this.sqlService.addStockItem(this.stockItem).subscribe((response: any) => {
      if (response.ok == true) {
        this.alertHeader = 'Success';
        this.alertMessage = 'Stock item added successfully.';
        this.AddStockForm.reset();
      } else {
        this.alertHeader = 'Error';
        this.alertMessage = 'Stock item could not be added.';
      }
      this.isAlertOpen = true;
    });
  }

  onAlertDismiss() {
    this.isAlertOpen = false;
    if (this.alertHeader == 'Success') {
      this.router.navigate(['/view-stock']);      
    }
  }
}

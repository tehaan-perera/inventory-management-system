import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss'],
})
export class UpdateStockComponent implements OnInit {
  // Current user variable
  user?: any;
  // Stock item variables
  editID?: number;
  stockItem?: any;
  // Alert variables
  isBtnDisabled: boolean = false;
  isAlertOpen: boolean = false;
  alertMessage: string = '';
  alertButton = ['OK'];
  alertHeader: string = '';
  // Form data variables
  stockUpdateForm: FormGroup = new FormGroup({});
  stockName: FormControl = new FormControl();
  stockCode: FormControl = new FormControl();
  stockDesc: FormControl = new FormControl();
  stockQty: FormControl = new FormControl();

  constructor(
    private sqlService: SqlService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated$){
      this.auth.user$.subscribe((userData) => {
        this.user = userData;
      })
    }
    this.editID = this.route.snapshot.params['id'];
    this.sqlService.getStockItem(this.editID).subscribe((currentItem: any) => {
      this.stockItem = {
        id: currentItem.id,
        stockCode: currentItem.stockCode,
        stockName: currentItem.stockName,
        stockDesc: currentItem.stockDesc,
        stockQty: currentItem.stockQty,
      };
      // Initial form data values
      this.stockCode.setValue(this.stockItem.stockCode);
      this.stockName.setValue(this.stockItem.stockName);
      this.stockDesc.setValue(this.stockItem.stockDesc);
      this.stockQty.setValue(this.stockItem.stockQty);
      // Form data validators
      this.stockCode.disable();
      this.stockName.setValidators([
        Validators.required,
        Validators.maxLength(50),
      ]);
      this.stockDesc.setValidators([Validators.maxLength(50)]);
      this.stockQty.setValidators([Validators.pattern('^[0-9]*$')]);
    });
  }

  onSubmit() {
    // Set form data values to stock item object
    this.stockItem.stockCode = this.stockCode.value;
    this.stockItem.stockName = this.stockName.value;
    this.stockItem.stockDesc = this.stockDesc.value;
    this.stockItem.stockQty = this.stockQty.value;

    this.sqlService
      .updateStockItem(this.stockItem.id, this.stockItem)
      .subscribe((updateSuccess: any) => {
        if (updateSuccess.ok == true) {
          this.alertMessage = 'Stock item updated successfully!';
          this.alertHeader = 'Success!';
        } else {
          this.alertMessage = 'Stock item could not be updated!';
          this.alertHeader = 'Error!';
        }
        this.isAlertOpen = true;
      });
  }
}

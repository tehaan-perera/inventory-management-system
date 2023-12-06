import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SqlService } from '../../services/sql.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.scss'],
})
export class ViewStockComponent implements OnInit {
  stockItems: any[] | undefined;
  user: any;
  isLoading: boolean = true
  // Alert variables
  alertHeading?: string;
  alertMessage?: string;
  alertButton?: string[] = ['OK'];
  isAlertOpen: boolean = false;
  noStock: boolean = false;
  // Modal variables
  modalHeading?: string;
  modalMessage?: string;
  isModalOpen: boolean = false;
  deleteID?: number;
  deleteCode?: string;
  deleteName?: string;

  constructor(
    private sqlService: SqlService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe((userData) => {
        this.user = userData;
      });
    }
    this.sqlService.getStockItems().subscribe((data: any) => {
      if (data.length === 0) {
        this.noStock = true;
        return;
      } else {
        this.noStock = false;
      }
      this.stockItems = data.map((item: any) => ({
        id: item.id,
        code: item.stockCode,
        name: item.stockName,
        desc: item.stockDesc,
        qty: item.stockQty,
      }));
      this.isLoading = false;
    });
  }

  onDeleteBtnClick(itemID: number) {
    this.sqlService.getStockItem(itemID).subscribe((currentItem: any) => {
      this.deleteID = currentItem.id;
      this.deleteCode = currentItem.stockCode;
      this.deleteName = currentItem.stockName;
      this.isModalOpen = true;
    });
  }

  cancel() {
    this.isModalOpen = false;
    this.deleteID = undefined;
    this.deleteCode = undefined;
    this.deleteName = undefined;
  }

  confirm() {
    this.sqlService.deleteStockItem(this.deleteID).subscribe((res: any) => {
      if (res.ok !== false) {
        this.alertHeading = 'Success';
        this.alertMessage = 'Stock item deleted successfully.';
      } else {
        this.alertHeading = 'Error';
        this.alertMessage = 'Stock item could not be deleted.';
      }
      this.cancel();
      this.isAlertOpen = true;
      this.ngOnInit();
    });
  }

  onEditBtnClick(itemID: number) {
    this.router.navigate(['/update-stock', itemID]);
  }

  addBtnClick() {
    this.router.navigate(['/add-stock']);
  }

  onRefreshBtnClick() {
    this.ngOnInit();
  }
}

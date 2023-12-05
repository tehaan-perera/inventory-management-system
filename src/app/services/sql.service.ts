import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SqlService {
  // private apiUrl = 'http://localhost:3500';
  private apiUrl = 'https://ims-sql-service.onrender.com'

  constructor(private http: HttpClient) {}
  getLoginDetails(username?: any) {
    return this.http.get(`${this.apiUrl}/login/`, username);
  }

  getStockItems() {
    return this.http.get(`${this.apiUrl}/stock`);
  }

  addStockItem(stockItem?: any) {
    return this.http.post(`${this.apiUrl}/stock`, stockItem);
  }

  getStockItem(id?: number) {
    return this.http.get(`${this.apiUrl}/stock/${id}`);
  }

  deleteStockItem(id?: number) {
    return this.http.delete(`${this.apiUrl}/stock/${id}`);
  }

  updateStockItem(id?: number, stockItem?: any) {
    return this.http.put(`${this.apiUrl}/stock/${id}`, stockItem);
  }
}

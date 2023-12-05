import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

const jsonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getLoginDetails(username: string | undefined) {
    return this.http.get(`${this.apiUrl}login?username=${username}`);
  }

  getStockItem(id?: number) {
    return this.http.get(`${this.apiUrl}stock/${id}`);
  }

  addStockItem(stockItem: any) {
    return this.http.post(`${this.apiUrl}stock`, stockItem, jsonHeader);
  }

  getStockItems() {
    return this.http.get(`${this.apiUrl}stock`);
  }

  deleteStockItem(id?: number): Observable<boolean> {
    return this.http
      .delete<Response>(`${this.apiUrl}stock/${id}`, jsonHeader)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  updateStockItem(stockItem: any) {
    return this.http
      .put<Response>(
        `${this.apiUrl}stock/${stockItem.id}`,
        stockItem,
        jsonHeader
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}

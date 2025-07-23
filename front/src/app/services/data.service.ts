import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface PocketBasePaginatedResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/registros-pocketbase';

  constructor(private http: HttpClient) { }

  getRecords(): Observable<any[]> {
    return this.http.get<PocketBasePaginatedResponse>(this.apiUrl).pipe(
      map(response => response.items)
    );
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importe HttpParams
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
  private apiUrl = 'http://localhost:3001/api/sabia-paineis';

  constructor(private http: HttpClient) { }

  getSabiaPaineis(onlyInternet?: boolean): Observable<any[]> {
    let params = new HttpParams();

    if (onlyInternet !== undefined) {
      params = params.set('internet', onlyInternet.toString());
    }

    return this.http.get<PocketBasePaginatedResponse>(this.apiUrl, { params }).pipe(
      map(response => response.items)
    );
  }
}
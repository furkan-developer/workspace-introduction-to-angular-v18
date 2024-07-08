import { Injectable, numberAttribute } from '@angular/core';
import { HousingLocation } from './housing-location';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private BASE_URL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(`${this.BASE_URL}HousingLocations`);
  }

  getHousingLocationById(id: number): Observable<HousingLocation> {
    return this.http.get<HousingLocation>(
      `${this.BASE_URL}HousingLocations/${id}`
    );
  }
}

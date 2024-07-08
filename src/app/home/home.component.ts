import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent],
  template: `
    <section>
      <input type="text" placeholder="Filter by ciy" />
      <button type="button">Search</button>
    </section>
    <section class="results">
      @for (item of housingLocations; track item) {
      <app-housing-location [housingLocation]="item"></app-housing-location>
      }
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  housingLocations!: HousingLocation[];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().subscribe({
      next: (data) => {
        this.housingLocations = data;
      },
      error: (error) => {
        console.error('Error fetching housing location', error);
      },
    });
  }
}

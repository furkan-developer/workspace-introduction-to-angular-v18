import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HousingLocation } from '../housing-location';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent],
  template: `
    <section>
      <input
        #cityFiltering
        (change)="onSearch()"
        type="text"
        placeholder="Filter by ciy"
      />
      <button type="button">Search</button>
    </section>
    <section class="results">
      @if (filteredHousingLocation.length === 0) {
      <h2>There is no house</h2>
      } @else{ @for (item of filteredHousingLocation; track item) {
      <app-housing-location [housingLocation]="item"></app-housing-location>
      } }
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  housingLocations: HousingLocation[] = [];
  filteredHousingLocation: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  @ViewChild('cityFiltering') cityFiltering!: ElementRef;

  constructor() {
    this.housingService.getAllHousingLocations().subscribe({
      next: (data) => {
        this.housingLocations = this.filteredHousingLocation = data;
      },
      error: (error) => {
        console.error('Error fetching housing location', error);
      },
    });
  }

  onSearch() {
    let nativeElement = this.cityFiltering.nativeElement;

    if (
      nativeElement.tagName.toLowerCase() === 'input' &&
      nativeElement.getAttribute('type').toLowerCase() === 'text'
    ) {
      this.filteredHousingLocation = this.housingLocations.filter((hl) =>
        hl.city.toLowerCase().includes(nativeElement.value.toLowerCase())
      );
    }
  }
}

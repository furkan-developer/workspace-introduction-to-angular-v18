import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  template: `
    <article>
    <img class="listing-photo" [src]="housingLocation?.photo" [alt]="housingLocation?.name">
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-feature">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Unit available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundy: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <button class="primary" type="button">Apply now</button>
    </section>
  </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  private housingLocationId!: number;
  housingLocation: HousingLocation | undefined;

  constructor(private route: ActivatedRoute,private housingService:HousingService) {
     route.params.subscribe(params => {
      this.housingLocationId = params['id']
    });

    this.housingLocation = housingService.getHousingLocationById(Number(this.housingLocationId));
  }
}

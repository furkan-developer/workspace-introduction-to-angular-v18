import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  template: `
    <p>
      details works!
    </p>
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

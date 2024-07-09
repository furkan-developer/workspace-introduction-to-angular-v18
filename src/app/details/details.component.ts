import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
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
      <form [formGroup]="applyForm" (submit)="onSubmit()">
        <label for="firstName">FirstName:</label>
        <input id="firstName" type="text" formControlName="firstName">

        <label for="lastName">LastName:</label>
        <input id="lastName" type="text" formControlName="lastName">

        <label for="email">Email:</label>
        <input id="email" type="email" formControlName="email">
        <button type="submit" class="primary">Apply now</button>
      </form>
    </section>
  </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private housingLocationId!: number;
  housingLocation: HousingLocation | undefined;
  applyForm!: FormGroup;

  constructor(private route: ActivatedRoute,private housingService:HousingService, private fb: FormBuilder) {
     route.params.subscribe(params => {
      this.housingLocationId = params['id']
    });

    housingService
      .getHousingLocationById(Number(this.housingLocationId))
      .subscribe({
        next: (data) => {
          this.housingLocation = data;
        },
        error: (error) => {
          console.error('Error fetching housing location', error);
        },
      });
  }

  ngOnInit(): void {
    this.applyForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
    });
  }

  onSubmit(){
    // TODO: handle datas inside applyFrom that is represent state of form

    console.log({
      firstName: this.applyForm.value.firstName ?? '',
      lastName: this.applyForm.value.lastName ?? '',
      email: this.applyForm.value.email ?? ''
    });
  }
}

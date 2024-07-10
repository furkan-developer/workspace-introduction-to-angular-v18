import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
        <input id="firstName" type="text" formControlName="firstName" required minlength="3">
         @if (firstName?.invalid && (firstName?.dirty || firstName?.touched)) {
          @if (firstName?.hasError('required')) {
            <div>First name is required</div>
          }
          @else if(firstName?.hasError('minlength')) {
            <div> First name length must be at least 3 characters</div>
          }
        }

        <label for="lastName">LastName:</label>
        <input id="lastName" type="text" formControlName="lastName" required minlength="3">
        @if (lastName?.invalid && (lastName?.dirty || lastName?.touched)) {
          @if (lastName?.hasError('required')) {
            <div>Last name is required</div>
          }
          @else if(lastName?.hasError('minlength')) {
            <div>Last name length must be at least 3 characters</div>
          }
        }

        <label for="email">Email:</label>
        <input id="email" type="email" formControlName="email" required>
         @if (email?.invalid && (email?.dirty || email?.touched)) {
          @if (email?.hasError('required')) {
            <div>Email is required</div>
          }
          @else if(email?.hasError('email')) {
            <div>Email is invalid</div>
          }
        }
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

  get firstName(){
    return this.applyForm.get('firstName');
  }

  get lastName(){
    return this.applyForm.get('lastName');
  }

  get email(){
    return this.applyForm.get('email');
  }

  ngOnInit(): void {
    this.applyForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(){
    // TODO: handle datas inside applyFrom that is represent state of form

    console.log({
      isValidForm: this.applyForm.valid,
      firstName: this.applyForm.value.firstName ?? '',
      lastName: this.applyForm.value.lastName ?? '',
      email: this.applyForm.value.email ?? ''
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <section>
      <input type="text" placeholder="Filter by ciy">
      <button type="button">Search</button>
    </section>
    <section class="results">
      <!-- searching details will be placed in here as distinct component -->
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

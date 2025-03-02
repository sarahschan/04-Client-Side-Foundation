import { Component } from '@angular/core';

@Component({
  selector: 'app-country-list',
  standalone: false,
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {

    locations: string[] = ['Singapore', 'Tokyo', 'Shanghai']

    addCountry(locationInput: string) {
      console.info("Adding to locations: ", locationInput)
      this.locations.push(locationInput)
    }

    removeLocation(index: number) {
      console.info("Removing location from list: Index ", index)
      this.locations.splice(index, 1)   // remove 1 entry at the index
    }
}

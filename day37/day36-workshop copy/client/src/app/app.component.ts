import { Component, inject, OnInit } from '@angular/core';
import { CitiesService } from './services/cities.service';
import { CityStore } from './shared/store/city.store';
import { City } from './model/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'client';
  cities! : City[]

  private citiesService = inject(CitiesService)
  private citiesStore = inject(CityStore)


  async ngOnInit() {
    this.cities = await this.citiesService.getCities()
    this.cities.forEach((city) => {
      console.log('Adding new city to store', city)
      this.citiesStore.addNewCity(city)
    })
  }

}

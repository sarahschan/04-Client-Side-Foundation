import { Component, inject, OnInit } from '@angular/core';

import cities from '../../assets/cities.json'
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse } from '../../../models/models';

@Component({
  selector: 'app-current-weather',
  standalone: false,
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent implements OnInit {

  private formBuilder = inject(FormBuilder)
  cityForm!: FormGroup

  citiesList = cities
   
  selectedCity: string = ''

  ngOnInit() {
    this.cityForm = this.formBuilder.group({
      selectedCity: this.formBuilder.control<string>('')
    })
  }



  private weatherService = inject(WeatherService)

  weatherData: WeatherResponse | null = null    // start out with null, will populate later on call

  getWeatherForCity() {
    this.selectedCity = this.cityForm.get('selectedCity')?.value
    console.info('>>> Selected City: ', this.selectedCity)
    this.weatherService.getWeatherData(this.selectedCity).subscribe({
      next: (WeatherResponse) => {
        this.weatherData = WeatherResponse
        console.info('Weather fetch successful')
      },
      error: (error) => {
        console.error('Error retrieving weather data: ', error)
      }
    })
  }

  

}

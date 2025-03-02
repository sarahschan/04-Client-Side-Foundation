import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse } from '../../../models/models';

@Component({
  selector: 'app-current-weather-text',
  standalone: false,
  templateUrl: './current-weather-text.component.html',
  styleUrl: './current-weather-text.component.css'
})
export class CurrentWeatherTextComponent {

  private weatherService = inject(WeatherService)

  requestedCity = ''
  weatherData: WeatherResponse | null = null
  errorEncountered!: boolean
  errorMsg = ''

  @ViewChild('cityInput') cityInput!: ElementRef

  getWeather(cityInput: string) {
    
    this.requestedCity = cityInput

    console.info('>>> City requested: ', this.requestedCity)

    this.weatherService.getWeatherData(this.requestedCity).subscribe({
      next: (weatherResponse) => {
          this.weatherData = weatherResponse
          console.info('Weather fetch successful')
          this.errorEncountered = false;
      },
      error: (error) => {
        console.error('Error retrieving weather data: ', error)
        this.errorEncountered = true
        this.errorMsg = error.error.message   // see console for error message structure
      }
    })

    this.cityInput.nativeElement.value = ''
  }
}

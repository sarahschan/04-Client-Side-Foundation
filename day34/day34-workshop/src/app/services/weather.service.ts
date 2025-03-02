import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private httpClient = inject(HttpClient)

  // https://api.openweathermap.org/data/2.5/weather?q=London&appid=${this.weatherAPIKEY}
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
  private weatherAPIKEY = environment.weatherApiKey

  getWeatherData(selectedCity: string): Observable<any> {
    const weatherData = this.httpClient.get(`${this.weatherUrl}?q=${selectedCity}&appid=${this.weatherAPIKEY}`)
    return weatherData
  }
}

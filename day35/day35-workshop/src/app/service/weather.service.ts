import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private httpClient = inject(HttpClient)

  // https://api.openweathermap.org/data/2.5/weather?q=London&appid=${this.weatherAPIKEY}
  private weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
  private weatherAPIKey = environment.WEATHER_API_KEY

  makeWeatherAPICall(location: string): Observable<any> {
    const finalAPIUrl = this.weatherBaseUrl + location + '&appid=' + this.weatherAPIKey
      console.info('>>> Making call to ' + finalAPIUrl)
    return this.httpClient.get(finalAPIUrl)
  }


}

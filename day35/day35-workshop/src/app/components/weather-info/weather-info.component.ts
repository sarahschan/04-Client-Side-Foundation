import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../service/weather.service';
import { WeatherAPIResponse } from '../../../models/models';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-weather-info',
  standalone: false,
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.css'
})
export class WeatherInfoComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private weatherService = inject(WeatherService)
  private errorService = inject(ErrorService)

  location = ''
  weatherData: WeatherAPIResponse | null = null


  ngOnInit() {
  
    this.location = this.route.snapshot.params['location']

    this.weatherService.makeWeatherAPICall(this.location).subscribe({
      next: (apiResponse) => {
        this.weatherData = apiResponse
        console.info('Weather fetch successful')

      },
      error: (error) => {
        console.info('Weather fetch unsuccessful', error)
        const errorMsg = error.error.message
        console.info('Now routing to error page')

        // navigate to error page and pass errorMsg as a query parameter
        // this.router.navigate(['/error'], {queryParams: { message: errorMsg } })

        // navigate to error page and pass errorMsg using errorService
        this.errorService.setErrorMessage(errorMsg)
        this.router.navigate(['/error'])

      }
    })

  }
  
}

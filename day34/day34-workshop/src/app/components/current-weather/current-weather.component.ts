import { Component, inject, OnInit } from '@angular/core';

import cities from '../../assets/cities.json'
import { FormBuilder, FormGroup } from '@angular/forms';

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
   
  selectedCity = ''

  ngOnInit() {
    this.cityForm = this.formBuilder.group({
      selectedCity: this.formBuilder.control<string>('')
    })
  }

  getWeatherForCity() {
    this.selectedCity = this.cityForm.value
    console.info('>>> Selected City: ', this.selectedCity)
  }

}

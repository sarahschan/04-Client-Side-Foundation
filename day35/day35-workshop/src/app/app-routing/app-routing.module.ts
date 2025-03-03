import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WeatherInfoComponent } from '../components/weather-info/weather-info.component';
import { CountryListComponent } from '../components/country-list/country-list.component';
import { ErrorComponent } from '../components/error/error.component';



const routes: Routes = [
  { path: '', component: CountryListComponent },
  { path: 'weather-info/:location', component: WeatherInfoComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

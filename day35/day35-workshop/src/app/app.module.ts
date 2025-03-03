import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    WeatherInfoComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

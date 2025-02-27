import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './components/createEmployee/create-employee.component';
import { DetailsEmployeeComponent } from './components/detailsEmployee/details-employee.component';
import { ListEmployeeComponent } from './components/listEmployee/list-employee.component';
import { UpdateEmployeeComponent } from './components/updateEmployee/update-employee.component';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from './material/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    DetailsEmployeeComponent,
    ListEmployeeComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

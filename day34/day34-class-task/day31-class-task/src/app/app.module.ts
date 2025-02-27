import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './components/createEmployee/create-employee.component';
import { DetailsEmployeeComponent } from './components/detailsEmployee/details-employee.component';
import { ListEmployeeComponent } from './components/listEmployee/list-employee.component';
import { UpdateEmployeeComponent } from './components/updateEmployee/update-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    DetailsEmployeeComponent,
    ListEmployeeComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

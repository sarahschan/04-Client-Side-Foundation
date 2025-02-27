import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './component/createEmployee/create-employee.component';
import { ListEmployeeComponent } from './component/listEmployee/list-employee.component';
import { UpdateEmployeeComponent } from './component/updateEmployee/update-employee.component';
import { DetailsEmployeeComponent } from './component/detailsEmployee/details-employee.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent,
    UpdateEmployeeComponent,
    DetailsEmployeeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

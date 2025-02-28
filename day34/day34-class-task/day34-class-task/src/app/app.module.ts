import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './components/createEmployee/create-employee.component';
import { DetailsEmployeeComponent } from './components/detailsEmployee/details-employee.component';
import { ListEmployeeComponent } from './components/listEmployee/list-employee.component';
import { UpdateEmployeeComponent } from './components/updateEmployee/update-employee.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from './material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouteGuardService } from './services/route-guard.service';
import { TestComponent } from './components/test/test.component';
import { DeactivateGuardService } from './services/deactivate-guard.service';
import { DebounceComponent } from './components/debounce/debounce.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    DetailsEmployeeComponent,
    ListEmployeeComponent,
    UpdateEmployeeComponent,
    TestComponent,
    DebounceComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    RouteGuardService,
    DeactivateGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

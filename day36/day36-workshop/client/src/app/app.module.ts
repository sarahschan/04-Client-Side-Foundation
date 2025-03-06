import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UploadComponent } from './components/upload/upload.component';
import { MaterialModule } from './material/material.module';
import { ViewImageComponent } from './components/view-image/view-image.component';
import { BackButtonComponent } from './components/back-button/back-button.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ViewImageComponent,
    BackButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

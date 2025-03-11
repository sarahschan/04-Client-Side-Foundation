import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ProductService } from './product.service';
import { CategoryComponent } from './components/category/category.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { ConfirmCheckoutComponent } from './components/confirm-checkout/confirm-checkout.component';
import { AppRoutingModule } from './app-routing.module';
import { CartStore } from './cart.store';

// NOTE: you are free to modify this file

const appRoutes: Routes = [
]

@NgModule({
  declarations: [
    AppComponent, 
    MainComponent, 
    OrderFormComponent, 
    ConfirmCheckoutComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ 
    ProductService,
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

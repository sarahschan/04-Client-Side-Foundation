import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CategoryComponent } from './components/category/category.component';
import { ConfirmCheckoutComponent } from './components/confirm-checkout/confirm-checkout.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "category/:category", component: CategoryComponent },
  { path: "checkout", component: ConfirmCheckoutComponent},
  { path: "**", redirectTo: ""}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }

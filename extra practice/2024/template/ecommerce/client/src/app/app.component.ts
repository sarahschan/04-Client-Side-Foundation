import { Component, OnInit, inject } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore)

  itemCount!: number
  itemCount$!: Subscription

  ngOnInit(): void {
    this.itemCount$ = this.cartStore.numProdductsInCart$.subscribe(
      (numProductsInCart) => this.itemCount = numProductsInCart
    )
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }


}

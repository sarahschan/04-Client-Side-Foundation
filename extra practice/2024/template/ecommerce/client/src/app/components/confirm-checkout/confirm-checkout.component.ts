import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartStore } from '../../cart.store';
import { Subscription } from 'rxjs';
import { LineItem } from '../../models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit, OnDestroy {

  // TODO Task 3

  private cartStore = inject(CartStore)
  private cartItemsSubscription$!: Subscription
  protected cartItems!: LineItem[]
  private cartTotalSubscription$!: Subscription
  protected totalPrice!: number

  ngOnInit(): void {
    
    // Get cartItems and total price
    this.cartItemsSubscription$ = this.cartStore.cartItems$.subscribe(
      cart => (
        this.cartItems = cart
      )
    )

    this.cartTotalSubscription$ = this.cartStore.totalPrice$.subscribe(
      totalPrice => (
        this.totalPrice = totalPrice
      )
    )

    console.info("Cart items in checkout: ", this.cartItems)
    console.info("Total price: ", this.totalPrice)


  }

  ngOnDestroy(): void {
    this.cartItemsSubscription$.unsubscribe()
  }
}

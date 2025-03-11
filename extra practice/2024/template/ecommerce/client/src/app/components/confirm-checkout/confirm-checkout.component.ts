import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartStore } from '../../cart.store';
import { Subscription } from 'rxjs';
import { LineItem, Order } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

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


  private formBuilder = inject(FormBuilder)
  protected orderForm!: FormGroup

  private productService = inject(ProductService)

  private router = inject(Router)

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


    // create the order form
    this.orderForm = this.createOrderForm()

  }

  submitOrder(): void {
    
    console.info('Recieved order details: ', this.orderForm.value)
    
    const newOrder: Order = this.orderForm.value
      newOrder.cart = { lineItems: this.cartItems }

    console.info(newOrder)

    this.productService.checkout(newOrder).subscribe({
      next: (response) => {
        
        console.log('>>> Order sent and saved: ', response.orderId)

        // success alert and navigate to 0
        alert(`Order successfully placed: Order ID ${response.orderId}`)
        this.router.navigate([''])
        
      },
      error: (error) => {

        console.error('>>> Error sending order: ', error.error.message)

        // error alert and stay
        alert(`Error placing order: ${error.error.message}`)
      }

    })

  }


  private createOrderForm(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control<string>('', [ Validators.required ]),
      address: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(3)]),
      priority: this.formBuilder.control<boolean>(false),
      comments: this.formBuilder.control<string>('')
    })
  }


  protected isFormInvalid() {
    return this.orderForm.invalid
  }

  ngOnDestroy(): void {
    this.cartItemsSubscription$.unsubscribe()
  }
}

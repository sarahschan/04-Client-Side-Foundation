import { Component, Input } from '@angular/core';
import { CartItem } from '../../models';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent {

  @Input()
  cart: CartItem[] = []

  get grandTotal(): number {
    var grandTotal = 0
    for (const cartItem of this.cart) {
      const itemTotal = cartItem.quantity * cartItem.unitPrice
      grandTotal += itemTotal
    }
    return grandTotal
  }

}

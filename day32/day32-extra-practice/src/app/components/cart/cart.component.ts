import { Component, Input } from '@angular/core';
import { CartItem } from '../../models';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  @Input()
  cartItem: CartItem = {
    name: '',
    image: '',
    unitPrice: 0,
    quantity: 0
  }

  get itemTotal(): number {
    return this.cartItem.unitPrice * this.cartItem.quantity
  }
  
}

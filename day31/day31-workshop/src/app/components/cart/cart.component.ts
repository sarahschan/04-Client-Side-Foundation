import { Component, Input, Output } from '@angular/core';
import { CartItem } from '../../models';
import { Subject } from 'rxjs/internal/Subject';

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
    quantity: 0
  }

  @Output()
  onDelete = new Subject<{ cartItem: CartItem}>()

  deleteItem() {
    this.onDelete.next({cartItem: this.cartItem})
  }
}

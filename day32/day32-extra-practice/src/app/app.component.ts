import { Component, inject, OnInit } from '@angular/core';
import { FruitService } from './services/fruit-service.service';
import { CartItem, Fruit } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'grocery shopping';

  fruitService = inject(FruitService)

  inventory!: Fruit[]
  cart: CartItem[] = []

  ngOnInit(): void {
      this.inventory = this.fruitService.getFruits()
      console.info('>>> from fruit service ngOnInit', this.inventory)
  }

  changeQty(event: { fruit: Fruit, delta: number}) {
    const fruitName = event.fruit.name
    const itemInCart = this.cart.find(cartItem => cartItem.name === fruitName )

    if (itemInCart) {
      itemInCart.quantity += event.delta
      if (itemInCart.quantity <= 0) {
        this.cart = this.cart.filter(item => item.name !== itemInCart.name)
      }

    } else {
      this.cart.push({
        name: event.fruit.name,
        image: event.fruit.image,
        unitPrice: event.fruit.price,
        quantity: 1
      })
    }

    console.log('>>> Updated Cart: ', this.cart)

  }
}

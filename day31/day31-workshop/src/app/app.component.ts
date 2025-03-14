import { Component, inject, OnInit } from '@angular/core';
import { CartItem, Fruit } from './models';
import { InventoryService } from './service/inventory.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  
  title = "Fruits Inventory"

  inventoryService = inject(InventoryService)
  inventory: Fruit[] = this.inventoryService.getInventory()
  cart: CartItem[] = []


  changeQty(event: { fruit: Fruit, increase: number}) {
    const fruitName = event.fruit.name

    const item = this.cart.find(cartItem => cartItem.name === fruitName)
    if (item) {
      item.quantity += event.increase
    } else {
      this.cart.push({
        name: event.fruit.name,
        image: event.fruit.image,
        quantity: event.increase
      })
    }

    console.log('Updated Cart: ', this.cart)
  }


  whenDelete(event: { cartItem: CartItem }) {
    this.cart = this.cart.filter(item => item.name !== event.cartItem.name)
    // Alternative method: (more similar to .remove or .delete)
    // const index = this.cart.findIndex(item => item.name === event.cartItem.name)
    // if (index !== -1) {
    //   this.cart.splice(index, 1)
    // }
  }

}

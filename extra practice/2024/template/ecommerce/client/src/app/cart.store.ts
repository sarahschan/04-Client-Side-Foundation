
// TODO Task 2
// Use the following class to implement your store

import { Injectable } from "@angular/core";
import { LineItem, Product } from "./models";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({               // @Injectable annotation makes it able to inject(CartStore)
    providedIn: 'root'
})

export class CartStore {

    private cartItemsSubject = new BehaviorSubject<LineItem[]>([])

    cartItems$: Observable<LineItem[]> = this.cartItemsSubject.asObservable()


    addToCart(lineItemToAdd: LineItem): void {

        console.info('Recieved order in CartStore')

        // check if item already exists in cart
        const currentCart: LineItem[] = this.cartItemsSubject.getValue()
        const existingIndex = currentCart.findIndex(existingItem => lineItemToAdd.prodId === existingItem.prodId)


        if (existingIndex >= 0) {                                                       // meaning the item already exists in the cart

            const updatedCart = [...currentCart]                                        // assign the currentCart to new array updatedItems array
            // ... is called the spread operator, it takes all the elements from currentCart array and places them individually into the new array
            
            updatedCart[existingIndex] = {                                              // Accesses the specific LineItem in the updatedCart array that needs to be updated
                ...updatedCart[existingIndex],                                          // ... spread operator again, but for objects. Takes all the properties from the existing LineItem and includes them in the new object
                quantity: updatedCart[existingIndex].quantity + lineItemToAdd.quantity  // overrides the quantity property with a new updated value
            }
            this.cartItemsSubject.next(updatedCart)

            console.info('Updated cart: ', this.cartItemsSubject.getValue())


        } else {

            const updatedCart = [...currentCart, lineItemToAdd]
            this.cartItemsSubject.next(updatedCart)

            console.info('Updated cart: ', this.cartItemsSubject.getValue())

        }

    }

}

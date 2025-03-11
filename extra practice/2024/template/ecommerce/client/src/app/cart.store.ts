
// TODO Task 2
// Use the following class to implement your store

import { Injectable } from "@angular/core";
import { LineItem, Product } from "./models";
import { BehaviorSubject, map, Observable } from "rxjs";


@Injectable({               // @Injectable annotation makes it able to inject(CartStore)
    providedIn: 'root'
})

export class CartStore {

    // BehaviourSubject and subscription for cartItems
    private cartItemsSubject = new BehaviorSubject<LineItem[]>([])
    cartItems$: Observable<LineItem[]> = this.cartItemsSubject.asObservable()

    // create a derived observable for the number of products in cart
    numProductsInCart$: Observable<number> = this.cartItems$.pipe(
        map(cart => cart.length)
    )

    // create a derived observable for the total price
    totalPrice$: Observable<number> = this.cartItems$.pipe(
        map(cartItems => {                  // performing operations to turn cartItems into another value
            return cartItems.reduce(        // .reduce() "reduces" an array to a single value by starting with an initial value (0), processing each item in the array and accumulating a result
                (total, item) => {          // Takes the running total so far and the current cart item
                    return total + (item.price * item.quantity)     // add price * quantity to the running total
                }, 0)                       // initial 0 value to start
        })
    )

    // another method that is more "java-like"
    // totalPrice$: Observable<number> = this.cartItems$.pipe(
    //     map(cartItems => {
    //         let sum = 0
    //         for (const item of cartItems) {
    //             sum += item.price * item.quantity
    //         }
    //         return sum
    //     })
    // )

    addToCart(lineItemToAdd: LineItem): void {

        console.info('Recieved order in CartStore')

        const currentCart: LineItem[] = this.cartItemsSubject.getValue()
        const updatedCart = [...currentCart, lineItemToAdd]

        this.cartItemsSubject.next(updatedCart)
        console.info('Updated cart: ', this.cartItemsSubject.getValue())
        

        // if I were to be extra and merge duplicate products
        // check if item already exists in cart
        // const currentCart: LineItem[] = this.cartItemsSubject.getValue()
        // const existingIndex = currentCart.findIndex(existingItem => lineItemToAdd.prodId === existingItem.prodId)


        // if (existingIndex >= 0) {                                                       // meaning the item already exists in the cart

        //     const updatedCart = [...currentCart]                                        // assign the currentCart to new array updatedItems array
        //     // ... is called the spread operator, it takes all the elements from currentCart array and places them individually into the new array
            
        //     updatedCart[existingIndex] = {                                              // Accesses the specific LineItem in the updatedCart array that needs to be updated
        //         ...updatedCart[existingIndex],                                          // ... spread operator again, but for objects. Takes all the properties from the existing LineItem and includes them in the new object
        //         quantity: updatedCart[existingIndex].quantity + lineItemToAdd.quantity  // overrides the quantity property with a new updated value
        //     }
        //     this.cartItemsSubject.next(updatedCart)

        //     console.info('Updated cart: ', this.cartItemsSubject.getValue())


        // } else {

        //     const updatedCart = [...currentCart, lineItemToAdd]
        //     this.cartItemsSubject.next(updatedCart)

        //     console.info('Updated cart: ', this.cartItemsSubject.getValue())

        // }

    }

}


// alternative entire class that might be a bit clearer, but you MUST remember to update each observable in addToCart method
// export class CartStore {

//     // BehaviourSubject and subscription for cartItems
//     private cartItemsSubject = new BehaviorSubject<LineItem[]>([])
//     cartItems$: Observable<LineItem[]> = this.cartItemsSubject.asObservable()

//     // BehaviourSubject and subscription for numProductsInCart
//     private numProductsInCartSubject = new BehaviorSubject<number>(0)
//     numProductsInCart$: Observable<number> = this.numProductsInCartSubject.asObservable()

//     // BehaviourSubject and subscription for totalPrice
//     private totalPriceSubject = new BehaviorSubject<number>(0)
//     totalPrice$: Observable<number> = this.totalPriceSubject.asObservable()

//     addToCart(lineItemToAdd: LineItem): void {

//         console.info('Recieved order in CartStore')

//         const currentCart = this.cartItemsSubject.getValue()
//         const updatedCart = [...currentCart, lineItemToAdd]
//         this.cartItemsSubject.next(updatedCart)
//         console.info('Updated cart: ', this.cartItemsSubject.getValue())


//         this.numProductsInCartSubject.next(updatedCart.length)
//         console.info('New numProductsInCart: ', this.numProductsInCartSubject.getValue())


//         const prevTotal = this.totalPriceSubject.getValue()
//         const newTotal = prevTotal + lineItemToAdd.price * lineItemToAdd.quantity
//         this.totalPriceSubject.next(newTotal)
//         console.info('New totalPrice: ', this.totalPriceSubject.getValue())

//     }

// }

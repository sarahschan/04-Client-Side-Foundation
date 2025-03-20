import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { CartSlice, Item } from "./models";

const INIT_STORE: CartSlice = {
    items: [],
    lastUpdate: 0
}

@Injectable()
export class CartStore extends ComponentStore<CartSlice> {

    constructor() { super(INIT_STORE) }


    // reducers/mutators

    // addToCart(newItem: Item)
    readonly addToCart = this.updater<Item>(
        (store: CartSlice, newItem: Item) => {
            
            // how to add newItem to store
            // you cannot update the store, a new copy has to be created

            // slow way
            // const _newStore: CartSlice = {
            //     items: [...store.items ],
            //     lastUpdate: Date.now()
            // }
            // _newStore.items.push(newItem)
            // return _newStore


            // fast way
            return {
                items: [...store.items, newItem],
                lastUpdate: Date.now()
            } as CartSlice

        }
    )


    // deleteItem(string)
    readonly deleteItem = this.updater<string>(
        (store: CartSlice, itemToDelete: string) => {
            return {
                items: store.items.filter(i => i.item != itemToDelete),
                lastUpdate: Date.now()
            }
        }
    )


    // selectors/queries

    // countItemsInCart()
    readonly countItemsInCart = this.select<number>(
        (store: CartSlice) => store.items.length
    )


    readonly getItems = this.select<Item[]>(
        (store: CartSlice) => store.items
    )


}
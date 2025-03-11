import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription} from 'rxjs';
import { Router} from '@angular/router';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore)

  itemCount!: number
  itemCount$!: Subscription

  ngOnInit(): void {
    this.itemCount$ = this.cartStore.numProductsInCart$.subscribe(
      (numProuctsInCart) => this.itemCount = numProuctsInCart
    )
  }

  invalidCheckout(): boolean {
    return this.itemCount <= 0
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }

  ngOnDestroy(): void {
    this.itemCount$.unsubscribe()
  }

}

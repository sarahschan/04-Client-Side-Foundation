import { inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CartStore } from './cart.store';
import { map, Observable, Subscription, take } from 'rxjs';

// IDK WHY THIS WAS WHAT WAS RECOMMENDED BY ANGULAR BUT THEN IT SAYS DEPRECIATED????
// @Injectable({
//   providedIn: 'root'
// })
// export class RouteGuardService implements CanActivate {

//   private router = inject(Router);
//   private cartStore = inject(CartStore);
  
//   canActivate(
//     route: ActivatedRouteSnapshot, 
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     // If cart has 0 or less items, do not allow routing to page /checkout
//     return this.cartStore.numProductsInCart$.pipe(
//       take(1),
//       map(itemCount => {
//         if (itemCount > 0) {
//           // Cart has items, allow navigation to checkout
//           return true;
//         } else {
//           // Cart is empty, redirect to home page
//           alert('Your cart is empty. Please add some items before proceeding to checkout.');
//           return this.router.createUrlTree(['/']);
//         }
//       })
//     );
//   }
// }

// Create a functional guard instead of a class
export const canActivateCheckout: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const cartStore = inject(CartStore);

  // If cart has 0 or less items, do not allow routing to page /checkout
  return cartStore.numProductsInCart$.pipe(
    take(1),
    map(itemCount => {
      if (itemCount > 0) {
        // Cart has items, allow navigation to checkout
        return true;
      } else {
        // Cart is empty, redirect to home page
        alert('Your cart is empty. Please add some items before proceeding to checkout.');
        return router.createUrlTree(['/']);
      }
    })
  );
};

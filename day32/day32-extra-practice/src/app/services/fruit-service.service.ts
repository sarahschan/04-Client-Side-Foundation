import { Injectable } from '@angular/core';
import { Fruit } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  public getFruits() : Fruit[] {
    const fruits: Fruit[] = [
      {name: 'Acorn Squash', image: '/fruits/acorn_squash.png', price: 3.50},
      {name: 'Apple', image: '/fruits/apple.png', price: 0.80},
      {name: 'Bell Pepper', image: '/fruits/bell_pepper.png', price: 1.30},
      {name: 'Broccoli', image: '/fruits/broccoli.png', price: 2.40},
      {name: 'Carrot', image: '/fruits/carrot.png', price: 1.00},
      {name: 'Celery', image: '/fruits/celery.png', price: 1.80},
      {name: 'Chili Pepper', image: '/fruits/chili_pepper.png', price: 3.00},
      {name: 'Corn', image: '/fruits/corn.png', price: 1.50},
      {name: 'Eggplant', image: '/fruits/eggplant.png', price: 2.20}
    ]
    return fruits
  }
  constructor() { }
}

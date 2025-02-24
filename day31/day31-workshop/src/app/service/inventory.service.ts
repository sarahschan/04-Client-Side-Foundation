import { Injectable } from '@angular/core';
import { Fruit } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  public getInventory(): Fruit[] {
    const inventory: Fruit[] = [
      {name: 'Acorn Squash', image: '/fruits/acorn_squash.png'},
      {name: 'Apple', image: '/fruits/apple.png'},
      {name: 'Bell Pepper', image: '/fruits/bell_pepper.png'},
      {name: 'Broccoli', image: '/fruits/broccoli.png'},
      {name: 'Carrot', image: '/fruits/carrot.png'},
      {name: 'Celery', image: '/fruits/celery.png'},
      {name: 'Chili Pepper', image: '/fruits/chili_pepper.png'},
      {name: 'Corn', image: '/fruits/corn.png'},
      {name: 'Eggplant', image: '/fruits/eggplant.png'},
    ]
    return inventory
  }
}

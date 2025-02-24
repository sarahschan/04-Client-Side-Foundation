import { Component, Input, Output } from '@angular/core';
import { Fruit } from '../../models';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

  @Input()
  fruit: Fruit = {
    name: '',
    image: '',
    price: 0
  }

  @Output()
  onChange = new Subject<{ fruit: Fruit; delta: number}>()

  changeQty(delta: number) {
    this.onChange.next({ fruit: this.fruit, delta: delta})
  }
}

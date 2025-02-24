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
    image: ''
  }
  
  @Output()
  changeQty = new Subject<{ fruit: Fruit; increase: number}>()

  private increase = 1

  increaseQty() {
    this.changeQty.next({ fruit: this.fruit, increase: this.increase})
  }
}

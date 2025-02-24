import { Component, Input } from '@angular/core';
import { Fruit } from '../../models';

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
}

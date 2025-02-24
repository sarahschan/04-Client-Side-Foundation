import { Component, inject, OnInit } from '@angular/core';
import { Fruit } from './models';
import { InventoryService } from './service/inventory.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  
  title = "Fruits Inventory"

  inventoryService = inject(InventoryService)
  inventory: Fruit[] = this.inventoryService.getInventory()





}

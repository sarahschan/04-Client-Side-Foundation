import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})

export class DisplayComponent {
    
    @Input() // recieves imagePath from app.component.ts through app.component.html
    imagePath!: string;

}

import { Component, OnInit } from '@angular/core';
import { from, tap } from 'rxjs';
import countries from '../../assets/countries.json';

@Component({
  selector: 'app-test',
  standalone: false,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {

  canExit(): boolean {
    
    if (confirm('Do you want to leave this page?')) {
      return true;

    } else {
      return false;
    }

  }

  numberSeries = from([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  sumOfNumbers() {
    this.numberSeries
    .pipe(tap(data => console.log('Tap: ', (data + data))))
    .subscribe(data => { console.log('Subscribe: ', data)})
  }

  data = countries
  
  ngOnInit(): void {
      this.sumOfNumbers()
      console.info(this.data)
  }

}

import { Component, OnInit } from '@angular/core';
import { from, map, Observable } from 'rxjs';

@Component({
  selector: 'app-example',
  standalone: false,
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent implements OnInit {

  ngOnInit(): void {
    this.multiplyBy3()
    this.toUpperCase()
    this.toFullName()
  }


  numbersArray:Observable<number>= from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  multiplyBy3() {
    this.numbersArray
      .pipe(map(data => { return data * 3 }))
      .subscribe(data => console.info(data))
  }


  foodArray = from(["Pizza", "Burger", "Sandwich", "Pasta", "Biryani"])

  toUpperCase() {
    this.foodArray
      .pipe(map(data => { return data.toUpperCase() }))
      .subscribe(data => { console.info(data) })
  }


  nameArray = from ([
    { fname: "John", lname: "Doe"},
    { fname: "Will", lname: "Smith"},
    { fname: "Marc", lname: "Jacobs"}
  ])

  toFullName() {
    this.nameArray
      .pipe(map(data => { return data.fname.concat(" ").concat(data.lname)}))
      .subscribe(data => { console.info(data) })
  }

  
}

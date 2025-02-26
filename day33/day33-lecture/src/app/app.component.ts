import { AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewChildComponent } from './view-child/view-child.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, AfterViewInit, DoCheck {
  
  
  title = 'day33-lecture';

  @ViewChild(ViewChildComponent) childComponent!: ViewChildComponent;

  @ViewChild("myImg") imageElement: ElementRef | undefined;   // == imageElement!: ElementRef
    // ? -> avoid null - if have show or do something
    // ! -> non assertion null - disallow null or undefined by default


  changeChildText() {
    this.childComponent.changeText();
  }


  isShow: boolean = false;

  ngOnInit(): void {
    this.isShow = true;
    console.log('>>> in ngOnInit: isShow set to ', this.isShow)
  }

  ngAfterViewInit(): void {
    console.log('>>> in ngAfterViewInit')
  }

  ngDoCheck(): void {
    console.log('>>> in ngDoCheck');
  }


}

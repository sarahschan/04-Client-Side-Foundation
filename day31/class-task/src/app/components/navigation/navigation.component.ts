import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { PageEvent } from '../../models';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})


export class NavigationComponent {

    @Output()
    onNavigate = new Subject<PageEvent>()       // This creates an event that can be emitted

    private step = 1
    
    handleNav(delta: number) {
        const pageEvent: PageEvent = {
            delta,              // delta: delta     since delta exists in this method, we can just use the shortcut
            step: this.step     // step does not exist within the method, hence have to use this identifier to call variable above
        }
        this.onNavigate.next(pageEvent)         // Emits the PageEvent to parent component (app.component)

    }

    updateStep(event: any){
        this.step = parseInt(event.target.value)
    }

}


// export class NavigationComponent {
    
//     @Output()
//     onNavigate = new Subject<number>()

//     private step = 1
    
//     handleNav(delta: number) {
//         // console.info(`delta clicked: ${delta}`)
//         this.onNavigate.next(delta)
//     }

//     updateStep(event: any){
//         this.step = parseInt(event.target.value)
//         // console.info(`${event.target.value} : ${typeof event.target.value}`)
//         // console.info(`${this.step} : ${typeof this.step}`)
//     }

// }

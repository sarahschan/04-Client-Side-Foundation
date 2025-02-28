import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-debounce',
  standalone: false,
  templateUrl: './debounce.component.html',
  styleUrl: './debounce.component.css'
})
export class DebounceComponent implements OnInit {

  private formBuilder = inject(FormBuilder)
  protected form!: FormGroup
  private subscription!: Subscription

  ngOnInit(): void {
      this.form = this.createForm()
  
      this.subscription = this.form.valueChanges
        .pipe(debounceTime(3000))
        .subscribe( value => {
          console.log(value)        // this will now show up after 3 seconds
        })
    }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control<string>('')
    }) 
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

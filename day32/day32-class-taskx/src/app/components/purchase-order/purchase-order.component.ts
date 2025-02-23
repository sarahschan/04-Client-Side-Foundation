import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseOrder } from '../../../models';

@Component({
  selector: 'app-purchase-order',
  standalone: false,
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})

export class PurchaseOrderComponent implements OnInit {
  
    // Inject form builder
    private formBuilder = inject(FormBuilder)
  
    // Create the form group
    protected form!: FormGroup
    protected availability!: FormArray

    // Create the form using createForm() method
    ngOnInit(): void {
        this.form = this.createForm()
    }


    // Process form method
    protected processForm() {
        const newPO: PurchaseOrder = this.form.value
          console.info(newPO)
    }


    private createForm() : FormGroup {
        return this.formBuilder.group({
            name: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(3) ]),
            address: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(3) ]),
            email: this.formBuilder.control<string>('', [ Validators.required, Validators.email ]),
            deliveryDate: this.formBuilder.control<string>('', [ Validators.required ]),
            availability: this.formBuilder.array([]),
            urgent: this.formBuilder.control<boolean>(false),
        })
    }


    protected updateAvailability(event: any) {

        const availability = this.form.get("availability") as FormArray

        const value = event.target.value
          // console.info('Selected availablility', value)

        if (event.target.checked) {
          availability.push(new FormControl(value));
        } else {
          const index = availability.controls.findIndex(control => control.value === value)
          if (index !== -1) {
            availability.removeAt(index)
          }
        }
    }


    protected isFieldValid(field: string): boolean{
        return !!this.form.get(field)?.valid
    }

    protected isFieldInvalid(field: string): boolean{
        return !!this.form.get(field)?.invalid
    }


    protected isUrgent() : boolean {
        const urgent = this.form.get("urgent")
        return urgent?.value
    }


    protected handleUrgent(){
        const availability = this.form.get("availability") as FormArray
        availability.clear()
        this.form.patchValue({
          availability: []
        })
        this.form.updateValueAndValidity();
    }

    protected resetUrgent(){
      const urgent = this.form.get("urgent")
      if (urgent){
        urgent.setValue(false)
        this.form.updateValueAndValidity();
      }
  }


}

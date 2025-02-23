import { state } from '@angular/animations';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { __classPrivateFieldSet, __values } from 'tslib';
import { PurchaseOrder } from '../../../models';

@Component({
  selector: 'app-purchase-order',
  standalone: false,
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})

export class PurchaseOrderComponent implements OnInit {

    // Inject FormBuilder utility (@Autowire)
    private formBuilder = inject(FormBuilder)


    // Declare a form object of type FormGroup
    // Declare an array (named lineItems) of type FormArray
    // ! (Definite Assignment Assertion) -> Tells TypeScript that this variable will be initialized later
    protected form!: FormGroup
    protected lineItems!: FormArray


    // ngOnInit() -> Similar to @PostConstruct, called when PurchaseOrderComponent is initialized
    // Initializes form (declared above) using this.createForm()
    ngOnInit(): void {
      this.form = this.createForm()
    }

    // createForm() method
    //  - Initializes form object & lineItems array
    private createForm(): FormGroup {
      this.lineItems = this.formBuilder.array([])
      return this.formBuilder.group({
        name: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(3)]),
        address: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(3)]),
        email: this.formBuilder.control<string>('', [ Validators.required, Validators.email ]),
        deliveryDate: this.formBuilder.control<string>('', [ Validators.required ]),
        urgent: this.formBuilder.control<boolean>(false),
        am: this.formBuilder.control<boolean>(false),
        pm: this.formBuilder.control<boolean>(false),
        ev: this.formBuilder.control<boolean>(false),
        lineItems: this.lineItems
      })
    }

    
    // Validation methods
    protected fieldError(fieldName: string): boolean {
      const field = this.form.get(fieldName) as FormControl
      return field.dirty && field.invalid
    }


    // Handle form submission method
    protected handleFormSubmission() {
      const newPO: PurchaseOrder = this.form.value
        console.info('>>> recieved PurchaseOrder: ', newPO)
    }

}


//  FormBuilder
//    - Service proviuded by ReactiveFormsModule
//    - Helps create and manage forms dynamically using TS
//
//
//  FormGroup 
//    - Is a container for form controls
//    - Groups multiple form fields together and manages their values & variation state
//    - Similar to a Java class with fields that represent form inputs
//
//
//  FormControl
//    - Class in ReactiveFormsModule that represents an individual form field
//    - Tracks the field's value, validation state, and user interactions
//    - Each field in a form is represented by a FormControl
//       - Set initial values
//       - Apply validation rules
//       - Track user input changes
//       - Check if a field is valid or invalid
//
//  .control
//    - Equivalient to new FormControl(...)
//    - Method provided by FormBuilder to create individual form fields
//    - Takes in 2 arguments: Initial value & validation rules
//
//
//   FormArray
//    - Holds a dynamic list of form controls or form groups



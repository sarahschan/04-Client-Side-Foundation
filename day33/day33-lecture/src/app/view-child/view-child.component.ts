import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models';

@Component({
  selector: 'app-view-child',
  standalone: false,
  templateUrl: './view-child.component.html',
  styleUrl: './view-child.component.css'
})

export class ViewChildComponent {

  childText: String = "default string"

  changeText() {
    this.childText = "Updated by ViewChild"
  }


  /////////

  private formBuilder = inject(FormBuilder)

  protected form!: FormGroup
  protected products!: FormArray

  ngOnInit(): void {
    this.form = this.createForm()
  }

  protected createForm(): FormGroup {
    this.products = this.formBuilder.array([])
    return this.formBuilder.group({
      products: this.products
    })
  }

  protected createProduct(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(5) ]),
      description: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(10) ]),
      quantity: this.formBuilder.control<number>(1)
    })
  }

  protected addProduct(): void {
    this.products.push(this.createProduct())
  }

  protected removeProduct(idx: number) {
    this.products.removeAt(idx)
  }

  protected submitOrder() {
    const newOrder: Order = this.form.value
    console.info('>>> Order: ', newOrder)
  }

}

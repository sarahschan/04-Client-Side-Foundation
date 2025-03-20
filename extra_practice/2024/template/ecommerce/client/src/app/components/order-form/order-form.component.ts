import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineItem } from '../../models';
import { CartStore } from '../../cart.store';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore)

  @Input({ required: true })
  productId!: string

  @Input({ required: true})
  name!: string

  @Input({ required: true })
  price!: number

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  addToCart() {
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.name,
      price: this.price
    }

    // const quantity = this.form.get('quantity')?.value

    console.info('Item and quantity requested: ', lineItem)

    this.cartStore.addToCart(lineItem)


    this.form = this.createForm()   // resets form to original state, not really needed but eh sure why not it was there already

  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }

}

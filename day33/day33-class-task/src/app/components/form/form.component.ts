import { Component, inject, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../models';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {

  private formBuilder = inject(FormBuilder)

  protected form!: FormGroup
  protected hobbies!: FormArray

  ngOnInit(): void {
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    this.hobbies = this.formBuilder.array([])
    return this.formBuilder.group({
      name: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(3) ]),
      email: this.formBuilder.control<string>('', [ Validators.required, Validators.email ]),
      phone: this.formBuilder.control<string>('', [ Validators.required ]),
      hobbies: this.hobbies
    })
  }

  private createHobby(): FormGroup {
    return this.formBuilder.group({
      hobby: this.formBuilder.control<string>('', [ Validators.required, Validators.minLength(3) ])
    })
  }

  protected addHobby() {
    this.hobbies.push(this.createHobby())
  }

  protected removeHobby(index: number) {
    this.hobbies.removeAt(index)
  }

  protected memberFieldError(fieldName: string): boolean {
    const field = this.form.get(fieldName) as FormControl
    return field.dirty && field.invalid
  }

  protected hobbyFieldError(index: number, fieldName: string): boolean {
    const hobbiesArray = this.form.get('hobbies') as FormArray
    const hobbiesGroup = hobbiesArray.at(index) as FormGroup
    const field = hobbiesGroup.get(fieldName) as FormControl
    return field.dirty && field.invalid
  }


  protected formInvalid(): boolean {
    return this.hobbies.length <= 0 || this.form.invalid
  }


  @Output()
  addNewMember = new Subject<Member>()
  
  protected processForm() {
    const newMember: Member = this.form.value
      console.info('>>> Recieved newMember: ', newMember)
    this.addNewMember.next(newMember)
  }


}

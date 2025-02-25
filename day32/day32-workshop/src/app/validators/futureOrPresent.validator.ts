import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureOrPresentValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        if (!control.value) {
            return null
        }

        const enteredDate = new Date(control.value).getTime()
        const today = new Date().setHours(0, 0, 0, 0)

        return enteredDate >= today ? null : { futureOrPresent: true };
    }
}
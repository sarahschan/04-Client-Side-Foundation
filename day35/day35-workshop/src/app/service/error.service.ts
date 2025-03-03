import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorMsg = 'An unknown error occurred'

  setErrorMessage(msg: string) {
    this.errorMsg = msg
  }

  getErrorMessage(): string {
    return this.errorMsg
  }
  
}

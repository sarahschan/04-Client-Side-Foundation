import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-error',
  standalone: false,
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private errorService = inject(ErrorService)
  errorMsg = ''

  ngOnInit() {
    
    // if passing errorMsg using query param
    // this.route.queryParams.subscribe(params => {
    //   this.errorMsg = params['message'] || 'An unknown error occurred'
    // })


    // if passing errorMsg using errorService
    this.errorMsg = this.errorService.getErrorMessage()

  }

}

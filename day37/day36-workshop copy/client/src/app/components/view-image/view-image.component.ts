import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileuploadService } from '../../services/fileupload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-image',
  standalone: false,
  templateUrl: './view-image.component.html',
  styleUrl: './view-image.component.css'
})
export class ViewImageComponent implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute)
  private fileUploadService = inject(FileuploadService)


  private postId = ""
  private routeParamsSubscription$!: Subscription
  protected imageData: any
  protected comments!: string


  ngOnInit(): void {
    this.routeParamsSubscription$ = this.activatedRoute.params.subscribe(async (routeParameters) => {    
      this.postId = routeParameters['postId']                                                            
      let r = await this.fileUploadService.getImage(this.postId)                                
      this.imageData = r.image
      this.comments = r.comments
    })
  }


  // this.activatedRoute.params is an OBSERVABLE that listens for changes in the route parameters e.g. postId
  //    when the route changes (e.g. navigating to a different postId), it emits the new parameters
  // .subscribe() is a method that listens to changes in an observable (in this case, this.activatedRoute.params)
  //    when the route parameters change (or are accessed), .subscribe triggers the callback functino, passing the new parameters into that function
  // (routeParameters) is the name of the argument that will hold the value emitted by this.activatedRoute.params
  //    e.g. if the URL is /image/123, routeParameters will look like { postId: '123' }
  //    individual parameters can be accessed by refering to routeParameters['parameterName'] e.g. routeParameters['postId']
  //
  // the callback function is asynchronous, which means it can contain await expressions to wait for promises to resolve
  //    in this case, the calling of fileUploadService.getImage
  //    without the async and await, there would be no value in r to assign imageData and comments

  ngOnDestroy(): void {
    this.routeParamsSubscription$.unsubscribe()
  }


}

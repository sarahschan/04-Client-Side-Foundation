import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-post',
  standalone: false,
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent implements OnInit, OnDestroy {

  private postService = inject(PostService)
  private activatedRoute = inject(ActivatedRoute)

  private routeParamsSubscription$!: Subscription
  protected postId!: string
  protected imageData!: string
  protected comments!: string
  

  ngOnInit(): void {
    
    this.routeParamsSubscription$ = this.activatedRoute.params.subscribe(async (routeParameters) => {
      
      this.postId = routeParameters['postId']

      let response = await this.postService.getPost(this.postId)

      this.imageData = response.image
      this.comments = response.comments

    })
  }


  ngOnDestroy(): void {
    this.routeParamsSubscription$.unsubscribe()
  }

}

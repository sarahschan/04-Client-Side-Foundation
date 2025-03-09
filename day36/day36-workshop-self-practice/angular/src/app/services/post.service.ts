import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private httpClient = inject(HttpClient)

  submitPost(comments: string, imageFile: File) {

    const formData = new FormData
      formData.set('comments', comments)
      formData.set('imageFile', imageFile)

    return lastValueFrom(this.httpClient
      .post<{postId: string}>('/api/post', formData)
    )
  }
}

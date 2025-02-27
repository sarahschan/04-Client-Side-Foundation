import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeryService {

  private httpClient = inject(HttpClient)

  private fakeryUrl = 'https://jsonfakery.com/photos'

  getFakeryPhotos(): Observable<any> {
    const photoData = this.httpClient.get(this.fakeryUrl)
    console.log(photoData)
    return photoData
  }

}

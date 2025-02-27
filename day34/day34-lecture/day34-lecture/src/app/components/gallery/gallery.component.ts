import { Component, inject, OnInit } from '@angular/core';
import { FakeryService } from '../../service/fakery.service';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit {

  private fakeryService = inject(FakeryService)

  photos: any[] = []

  photosLimited: any[] = []

  ngOnInit() {
    this.fakeryService.getFakeryPhotos().subscribe({
      next: (photo) => {
        this.photos = photo
        this.photosLimited = this.photos.slice(0, 25)
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {         // Optional
        console.log('Data stream complete')
      }
    })
  }

}

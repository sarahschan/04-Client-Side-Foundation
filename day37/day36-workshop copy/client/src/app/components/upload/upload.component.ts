import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileuploadService } from '../../services/fileupload.service';
import { Router } from '@angular/router';
import { CityStore } from '../../shared/store/city.store';
import { Observable } from 'rxjs';
import { City } from '../../model/city';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {

  private formBuilder = inject(FormBuilder)
  private fileUploadService = inject(FileuploadService)
  private router = inject(Router)
  private cityStore = inject(CityStore)
  
  protected uploadForm!: FormGroup
  private dataUri!: string
  private blob!: Blob
  protected citiesList$!: Observable<City[]>
  protected selectedCity!: string


  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      comments: this.formBuilder.control<string>('')
    })
    this.loadCities()   // <- load the cities from the store on init
  }


  // new function from day 37
  loadCities() {
    this.citiesList$! = this.cityStore.cities$
    this.cityStore.loadCities()
  }



  onFileChange(event: Event) {
    
    console.log("in method onFileChange")
    const input = event.target as HTMLInputElement

    if (input.files && input.files.length > 0) {
      const file = input.files[0]
      console.log('File extracted: ', file)

      const reader = new FileReader()
      reader.onload = () => {
        this.dataUri = reader.result as string  // Assign only after reading is done
      }

      reader.readAsDataURL(file)    // start the asynchronous read

    }

  }


  upload() {
    console.log(this.dataUri)

    if (!this.dataUri) {
      return
    }

    this.blob = this.dataURItoBlob(this.dataUri)
    const formValue = this.uploadForm.value
    this.fileUploadService.upload(formValue, this.blob)
      .then(
        (result) => {
          console.log(result);
          this.router.navigate(['/image', result.postId]);
        }
      )
  }


  dataURItoBlob(dataURI: string): Blob{
    const [meta, base64Data] = dataURI.split(',');
    const mimeMatch = meta.match(/:(.*?);/);

    const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
    const byteString = atob(base64Data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for(let i = 0; i < byteString.length; i++){
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeType});
  }

}

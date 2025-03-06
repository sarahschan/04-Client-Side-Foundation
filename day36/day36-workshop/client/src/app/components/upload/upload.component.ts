import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileuploadService } from '../../services/fileupload.service';
import { Router } from '@angular/router';

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
  
  protected uploadForm!: FormGroup
  private dataUri!: string
  private blob!: Blob


  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      comments: this.formBuilder.control<string>('')
    })
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

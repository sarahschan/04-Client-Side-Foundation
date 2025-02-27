import { Component, inject } from '@angular/core';
import { FilesService } from '../../service/files.service';
import { FakeryService } from '../../service/fakery.service';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  private fileService = inject(FilesService)

  selectedFile: File | undefined;

  stageFile(event: any) {
    this.selectedFile = event.target.files[0]
  }

  uploadFile() {
    if (this.selectedFile) {    // -> if (this.selectedFile != null)
      this.fileService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }

}

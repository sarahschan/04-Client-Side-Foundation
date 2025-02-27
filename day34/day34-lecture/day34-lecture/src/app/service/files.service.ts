import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private httpClient: HttpClient) { }

  
  private fileUrl = 'http://localhost:3000/'


  uploadFile(file: File): Observable<any> {
    
    const formData = new FormData()   // FormData is used to send files in a format that the backend can process (similar to xxx-url-encoded)
    formData.append('file', file)     // key value pair
    
    return this.httpClient.post(this.fileUrl + 'uploadFile', formData)    // 
  }


  // HOMEWORK
  getFiles() {

  }

}

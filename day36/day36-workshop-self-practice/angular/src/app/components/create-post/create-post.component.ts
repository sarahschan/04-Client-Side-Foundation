import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {

  private formBuilder = inject(FormBuilder)
  private postService = inject(PostService)
  private router = inject(Router)

  protected postForm!: FormGroup
  private selectedFile: File | null = null

  ngOnInit(): void {
      this.postForm = this.formBuilder.group({
        comments: this.formBuilder.control<string>('')
      })
  }


  onImageSelected(event: Event): void {
    
    const input = event.target as HTMLInputElement

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]
    }
  }

  
  submitPost() {

    if (!this.selectedFile) {
      return
    }

    const comments = this.postForm.value
    this.postService.submitPost(comments, this.selectedFile)
      .then(
        (result) => {
          console.log('Upload successful', result)
          this.router.navigate(['/', result.postId])
        }
      )
      .catch(error => {
        console.error('Upload error: ', error)
      })
  }
}

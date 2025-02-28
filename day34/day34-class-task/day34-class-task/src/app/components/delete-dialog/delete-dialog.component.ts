import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: false,
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {

  constructor (
    public dialogRef: MatDialogRef<DeleteDialogComponent>,  // to control the dialog actions
    // @Inject(MAT_DIALOG_DATA) public data: { name : string }  // recieving the employee data
  ) {}


  onCancel(): void {
    this.dialogRef.close(false)     // Close dialog and return 'false'
  }


  onDelete(): void {
    this.dialogRef.close(true)      // Close dialog and return 'true'
  }


}

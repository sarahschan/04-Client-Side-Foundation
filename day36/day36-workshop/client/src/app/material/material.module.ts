import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule { }

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title?: string;
  body: string;
  confirmButtonText: string;
  rejectButtonText: string;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  selector: 'app-confirmation-dialog',
  template: `
    @if (data.title) {
      <h2 mat-dialog-title>{{ data.title }}</h2>
    }

    <mat-dialog-content>
      {{ data.body }}
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" color="accent">{{ data.rejectButtonText }}</button>
      <button mat-button [mat-dialog-close]="true" color="warn">{{ data.confirmButtonText }}</button>
    </mat-dialog-actions>
  `,
  styles: ''
})
export class ConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
    // Explicitly convert return value to boolean (to catch dialog exits resulting from page esc or clicking backdrop)
    this.dialogRef.beforeClosed().subscribe((confirmed: boolean | undefined) => this.dialogRef.close(Boolean(confirmed)));
  }
}

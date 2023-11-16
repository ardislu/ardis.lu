import { Component, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface NotificationDialogData {
  title?: string;
  body: string;
  buttonText: string;
}

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  selector: 'app-notification-dialog',
  template: `
    @if (data.title) {
      <h2 mat-dialog-title>{{ data.title }}</h2>
    }

    <mat-dialog-content>
      {{ data.body }}
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button mat-dialog-close color="accent">{{ data.buttonText }}</button>
    </mat-dialog-actions>
  `,
  styles: ''
})
export class NotificationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: NotificationDialogData) { }
}

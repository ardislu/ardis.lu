import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title?: string;
  body: string;
  confirmButtonText: string;
  rejectButtonText: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {
    // Explicitly convert return value to boolean (to catch dialog exits resulting from page esc or clicking backdrop)
    this.dialogRef.beforeClosed().subscribe((confirmed: boolean | undefined) => this.dialogRef.close(Boolean(confirmed)));
  }

  ngOnInit(): void {
  }

}

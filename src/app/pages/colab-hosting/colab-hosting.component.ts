import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BostonParameters, BostonPrediction } from '@models/colab-hosting.model';
import { ColabHostingService } from '@services/colab-hosting.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent, NotificationDialogData } from '@components/notification-dialog.component';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDividerModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  selector: 'app-colab-hosting',
  templateUrl: './colab-hosting.component.html',
  styleUrls: ['./colab-hosting.component.scss']
})
export class ColabHostingComponent {
  // Basic form controls
  public colabHost = ''; // ngrok URL taken from Colab notebook instance
  public selectedType: 'average' | 'premium' | 'custom' = 'average';
  public bostonPrediction$: Observable<BostonPrediction> | undefined; // Resolves to final predicted house price
  public showFirstContent = true; // Only true until the first prediction is ran
  public showAdvancedOptions = false;

  // Advanced form controls
  public selectedModel: 'simple' | 'boosting' | 'bagging' = 'bagging';
  public customParams: { [param: string]: number } = {
    CRIM: 3.61352,
    ZN: 11.36,
    INDUS: 11.14,
    CHAS: 0.06917,
    NOX: 0.5547,
    RM: 6.285,
    AGE: 68.57,
    DIS: 3.795,
    RAD: 9.549,
    TAX: 408.2,
    PTRATIO: 18.46,
    B: 356.67,
    LSTAT: 12.65
  };

  // Mappings
  public readonly bostonModels: { value: 'simple' | 'boosting' | 'bagging'; viewValue: string }[] = [
    { value: 'simple', viewValue: 'Linear Regression' },
    { value: 'boosting', viewValue: 'Gradient Boosting Regressor' },
    { value: 'bagging', viewValue: 'Extra Trees Regressor' }
  ];

  constructor(private colab: ColabHostingService, private dialog: MatDialog) { }

  // Force https:// on ngrok URL
  setColabHost(e: Event): void {
    const value = (e.target as HTMLInputElement).value;

    // Matches: `http://${host}.ngrok.io` OR `https://${host}.ngrok.io` OR `http://${host}.ngrok.io/` OR `https://${host}.ngrok.io/`
    if (/^(https?:\/\/)(\w|-)+\.ngrok\.io\/?$/.test(value)) {
      const url = new URL(value);
      this.colabHost = `https://${url.host}`;
    }
    // Matches: `${host}.ngrok.io`
    else if (/^(\w|-)+\.ngrok\.io$/.test(value)) {
      this.colabHost = `https://${value}`;
    }
    // Matches: `${host}.ngrok.io/`
    else if (/^(\w|-)+\.ngrok\.io\/$/.test(value)) {
      this.colabHost = `https://${value.slice(0, -1)}`;
    }
    else {
      this.colabHost = '';
    }
  }

  // Custom behavior on radio button change instead of two-way data binding
  setSelectedType(type: 'average' | 'premium' | 'custom'): void {
    if (type === 'average') {
      this.selectedType = 'average';
      this.customParams = {
        CRIM: 3.61352,
        ZN: 11.36,
        INDUS: 11.14,
        CHAS: 0.06917,
        NOX: 0.5547,
        RM: 6.285,
        AGE: 68.57,
        DIS: 3.795,
        RAD: 9.549,
        TAX: 408.2,
        PTRATIO: 18.46,
        B: 356.67,
        LSTAT: 12.65
      };
    }
    else if (type === 'premium') {
      this.selectedType = 'premium';
      this.customParams = {
        CRIM: 0.00632,
        ZN: 100,
        INDUS: 0.46,
        CHAS: 1,
        NOX: 0.385,
        RM: 8.78,
        AGE: 45.02,
        DIS: 2.1,
        RAD: 24,
        TAX: 666,
        PTRATIO: 12.6,
        B: 356.67,
        LSTAT: 1.73
      };
    }
    else {
      this.selectedType = 'custom';
      this.showAdvancedOptions = true;
    }
  }

  // Pass as a *ngFor trackBy function to disable re-rendering on this *ngFor loop
  // Note: elements within the loop must handle data binding on their own
  trackByNull(): void {
  };

  // Custom behavior on param input field change instead of two-way data binding
  setParam(param: string, e: Event) {
    this.selectedType = 'custom';
    const value = (e.target as HTMLInputElement).value;
    this.customParams[param] = parseFloat(value as string);
  }

  getPrice(): void {
    const handleError = (error: HttpErrorResponse) => {
      this.showFirstContent = true; // Reset pricePlaceholder in case there was a previous success
      const data: NotificationDialogData = {
        title: 'Something went wrong',
        body: 'Unable to connect to the backend. Make sure the Colab notebook is running!',
        buttonText: 'OK'
      };
      this.dialog.open(NotificationDialogComponent, { data });
      return throwError(error);
    };

    this.bostonPrediction$ = this.colab.getBostonPrice(this.colabHost, this.selectedModel, new BostonParameters(this.customParams)).pipe(
      catchError(handleError),
      tap(() => this.showFirstContent = false)
    );
  }
}

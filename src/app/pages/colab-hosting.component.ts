import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ColabHostingService } from '@services/colab-hosting.service';
import { HeadService } from '@services/head.service';
import { NotificationDialogComponent, NotificationDialogData } from '@components/notification-dialog.component';
import { BostonParameters, BostonPrediction } from '@models/colab-hosting.model';

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
  template: `
    <mat-card>
      <mat-card-title class="mat-card-header-text-margin">colab hosting</mat-card-title>
      <mat-card-subtitle class="mat-card-header-text-margin">Complementary front-end that queries my
        <a target="_blank" rel="noopener noreferrer"
          href="https://colab.research.google.com/github/ardislu/colab-hosting-example/blob/main/colab-hosting-example.ipynb">Colab-based
          machine learning backend<mat-icon svgIcon="launch"></mat-icon>
        </a>.
      </mat-card-subtitle>

      <mat-card-content>
        <mat-form-field>
          <mat-label>ngrok URL</mat-label>
          <input matInput [(ngModel)]="colabHost" (change)="setColabHost($event)" type="url" pattern="(https?:\/\/)?(\w|-)+\.ngrok\.io\/?"
            placeholder="https://xxxxxxxxxxxx.ngrok.io/" required>
        </mat-form-field>

        <mat-label>Select a home type:</mat-label>
        <mat-radio-group aria-label="Select a home type" [value]="selectedType" (change)="setSelectedType($event.value)">
          <mat-radio-button value="average">Average</mat-radio-button>
          <mat-radio-button value="premium">Premium</mat-radio-button>
          <mat-radio-button value="custom">Custom</mat-radio-button>
        </mat-radio-group>

        @if (bostonPrediction$ | async; as bostonPrediction) {
          <h2>{{ bostonPrediction.price * 1000 | currency }}</h2>
        }
        @else if (showFirstContent) {
          <h2>Press GET PRICE to predict the house price!</h2>
        }
        @else {
          <mat-spinner [diameter]="25"></mat-spinner>
        }

        <mat-divider></mat-divider>

        <mat-expansion-panel [(expanded)]="showAdvancedOptions" class="mat-elevation-z0">
          <mat-expansion-panel-header>
            <mat-panel-title>Advanced options</mat-panel-title>
          </mat-expansion-panel-header>

          <mat-form-field class="text-block" appearance="fill">
            <mat-label>Machine learning model</mat-label>
            <mat-select [(ngModel)]="selectedModel" name="model">
              @for (model of bostonModels; track model) {
                <mat-option [value]="model.value">
                  {{model.viewValue}}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>

          @for (item of customParams | keyvalue; track null) {
              <mat-form-field class="parameter-setting">
                <mat-label>{{ item.key }}</mat-label>
                <input matInput [value]="item.value" (change)="setParam(item.key, $event)" type="number" step="0.00001">
              </mat-form-field>
          }
        </mat-expansion-panel>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button color="primary" (click)="getPrice()">
          GET PRICE
        </button>
        <button mat-button color="accent" routerLink="/">HOME</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    mat-card {
      box-sizing: border-box;
      inline-size: min(100% - 2rem, 720px);
      margin-inline: auto;
      margin-block: 1rem;
    }

    mat-icon {
      block-size: 14px;
    }

    mat-form-field {
      inline-size: 100%;
    }

    mat-radio-group {
      display: flex;
      flex-direction: column;
    }

    mat-divider {
      margin-block: 1rem;
    }

    mat-expansion-panel {
      display: flex;
      flex-flow: row wrap;
    }

    mat-expansion-panel-header {
      inline-size: 100%;
      padding-inline: 0.5rem;
    }

    .parameter-setting {
      inline-size: 7rem;
      margin-inline-end: 1rem;
    }
  `
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

  constructor(private colab: ColabHostingService, private dialog: MatDialog, private head: HeadService) {
    this.head.metadata = {
      title: 'colab-hosting',
      description: 'Frontend for a machine learning backend hosted in Google Colab.',
      canonicalUrl: 'https://ardis.lu/colab-hosting'
    };
  }

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
      return throwError(() => error);
    };

    this.bostonPrediction$ = this.colab.getBostonPrice(this.colabHost, this.selectedModel, new BostonParameters(this.customParams)).pipe(
      catchError(handleError),
      tap(() => this.showFirstContent = false)
    );
  }
}

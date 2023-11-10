import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { BaseTheme } from '@models/theme.model';
import { AuthService } from '@services/auth.service';
import { ThemeService } from '@services/theme.service';
import { SkeletonLoaderComponent } from '@components/skeleton-loader.component';
import { ConfirmationDialogData, ConfirmationDialogComponent } from '@components/confirmation-dialog.component';
import { HeadService } from '@services/head.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    SkeletonLoaderComponent
  ],
  selector: 'app-settings',
  template: `
    <!-- Fetch user profile from Auth0 -->
    @if (auth.userProfile$ | async; as profile) {
      <mat-card>
        <mat-card-header>
          <img mat-card-image mat-card-avatar [src]="profile.picture">
          <mat-card-title>
            {{ profile.name }}
          </mat-card-title>
          <mat-card-subtitle>
            User Settings
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field>
            <mat-label>Theme</mat-label>
            <mat-select [(ngModel)]="themeSelection" (selectionChange)="theme.setTheme(themeSelection)">
              @for (theme of themeList$ | async; track theme) {
                <mat-option [value]="theme">
                  {{ theme.displayName }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="accent" routerLink="/">HOME</button>
          <button mat-button color="warn" (click)="logout()">LOG OUT</button>
        </mat-card-actions>
      </mat-card>
    }
    @else {
      <!-- Placeholder loading bars -->
      <mat-card>
        <mat-card-title>
          <app-skeleton-loader></app-skeleton-loader>
        </mat-card-title>
        <mat-card-content>
          <app-skeleton-loader [count]="5"></app-skeleton-loader>
        </mat-card-content>
      </mat-card>
    }
  `,
  styles: `
    mat-card {
      box-sizing: border-box;
      inline-size: min(100% - 2rem, 720px);
      margin-inline: auto;
      margin-block: 1rem;
    }
  `
})
export class SettingsComponent implements OnInit {
  public themeList$!: Observable<BaseTheme[]>;
  public themeSelection!: BaseTheme;

  constructor(public auth: AuthService, public theme: ThemeService, private dialog: MatDialog, private head: HeadService) {
    this.head.metadata = {
      title: 'Settings',
      description: 'Configure personal user settings.',
      canonicalUrl: 'https://ardis.lu/settings'
    };
  }

  ngOnInit(): void {
    this.themeList$ = this.theme.list();
    this.themeSelection = this.theme.selectedTheme;
  }

  logout(): void {
    const data: ConfirmationDialogData = {
      title: 'Logout?',
      body: 'Are you sure you want to logout?',
      confirmButtonText: 'LOGOUT',
      rejectButtonText: 'CANCEL'
    };
    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, { data });
    confirmationDialog.afterClosed().subscribe((confirmed: boolean) => { if (confirmed) { this.auth.logout(); } });
  }

}

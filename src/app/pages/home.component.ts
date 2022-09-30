import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { DirectusService } from '@services/directus.service';
import { SkeletonLoaderComponent } from '@components/skeleton-loader.component';
import { NotificationDialogComponent, NotificationDialogData } from '@components/notification-dialog.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SkeletonLoaderComponent
  ],
  selector: 'app-home',
  template: `
    <main>
      <!-- Project cards fetched from API  -->
      <ng-container *ngIf="directus.cards$ | async as projectCards; else loading">
        <mat-card *ngFor="let project of projectCards">
          <mat-card-title>
            <div>{{ project.title }}</div>
          </mat-card-title>
          <mat-card-content>
            {{ project.description }}
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="accent" (click)="openProject(project.route)">
              View project
            </button>
            <mat-icon svgIcon="launch" *ngIf="isExternalRoute(project.route)"></mat-icon>
          </mat-card-actions>
        </mat-card>
      </ng-container>

      <!-- Skeleton cards as placeholders while loading -->
      <ng-template #loading>
        <mat-card *ngFor="let num of placeholderCards">
          <mat-card-title>
            <app-skeleton-loader></app-skeleton-loader>
          </mat-card-title>
          <mat-card-content>
            <app-skeleton-loader [count]="10"></app-skeleton-loader>
          </mat-card-content>
          <mat-card-actions>
            <app-skeleton-loader></app-skeleton-loader>
          </mat-card-actions>
        </mat-card>
      </ng-template>
    </main>
  `,
  styles: [`
    main {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr));
      grid-gap: 1rem;
      inline-size: min(100% - 2rem, 1920px);
      margin-inline: auto;
      margin-block: 1rem;
    }

    mat-icon {
      block-size: 14px;
    }
  `]
})
export class HomeComponent {
  public placeholderCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(public directus: DirectusService, private router: Router, private dialog: MatDialog) { }

  isExternalRoute(route: string): boolean {
    let url;
    try {
      url = new URL(route);
    }
    catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  openProject(project: string): void {
    if (project === 'placeholder') {
      const data: NotificationDialogData = {
        title: 'Project unavailable... for now.',
        body: 'This project isn\'t available right now, sorry!',
        buttonText: 'OK'
      };
      this.dialog.open(NotificationDialogComponent, { data });
      return;
    }
    else if (this.isExternalRoute(project)) {
      location.href = project;
    }
    else {
      this.router.navigate([`/${project}`]);
    }
  }

}

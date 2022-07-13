import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonLoaderComponent } from '@components/skeleton-loader.component';
import { AboutCardService } from '@services/strapi.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SkeletonLoaderComponent
  ],
  selector: 'app-about',
  template: `
    <!-- Fetch About info from CMS -->
    <ng-container *ngIf="about.list() | async as aboutCard; else loading">
      <mat-card class="about-card">
        <mat-card-header>
          <mat-icon mat-card-avatar svgIcon="logo"></mat-icon>
          <mat-card-title>
            {{ aboutCard.title }}
          </mat-card-title>
          <mat-card-subtitle>
            {{ aboutCard.subtitle }}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>
            {{ aboutCard.description }}
          </p>
          <a href="https://github.com/ardislu/ardis.lu" aria-label="GitHub" mat-icon-button>
            <mat-icon svgIcon="github"></mat-icon>
          </a>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="accent" (click)="location.back()">BACK</button>
          <button mat-button color="accent" routerLink="/">HOME</button>
        </mat-card-actions>
      </mat-card>
    </ng-container>

    <!-- Placeholder loading bars -->
    <ng-template #loading>
      <mat-card class="about-card">
        <mat-card-title>
          <app-skeleton-loader></app-skeleton-loader>
        </mat-card-title>
        <mat-card-content>
          <app-skeleton-loader [count]="8"></app-skeleton-loader>
        </mat-card-content>
      </mat-card>
    </ng-template>
  `,
  styles: [`
    .about-card {
      width: min(70%, 40em);
      margin: min(10%, 5em) auto;
      white-space: pre-wrap;
    }
  `]
})
export class AboutComponent {
  constructor(public location: Location, public about: AboutCardService) { }
}

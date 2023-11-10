import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DirectusService } from '@services/directus.service';
import { SkeletonLoaderComponent } from '@components/skeleton-loader.component';
import { HeadService } from '@services/head.service';

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
    @if (directus.about$ | async; as aboutCard) {
      <mat-card>
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
    }
    @else {
      <!-- Placeholder loading bars -->
      <mat-card>
        <mat-card-title>
          <app-skeleton-loader></app-skeleton-loader>
        </mat-card-title>
        <mat-card-content>
          <app-skeleton-loader [count]="8"></app-skeleton-loader>
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
export class AboutComponent {
  constructor(public location: Location, public directus: DirectusService, private head: HeadService) {
    this.head.metadata = {
      title: 'about',
      description: 'My portfolio website for small web experiments.',
      canonicalUrl: 'https://ardis.lu/about'
    };
  }
}

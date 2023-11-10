import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Fuse from 'fuse.js';

import { HeadService } from '@services/head.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  selector: 'app-not-found',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-icon mat-card-avatar svgIcon="logo"></mat-icon>
        <mat-card-title>
          404
        </mat-card-title>
        <mat-card-subtitle>
          Page not found.
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p *ngIf="path; else noSuggestion">
          Did you mean <a [routerLink]="['/' + path]">{{ path }}</a>?
        </p>
        <ng-template #noSuggestion>
          <p>
            Use the buttons below to return to safety.
          </p>
        </ng-template>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="accent" (click)="location.back()">BACK</button>
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
  `
})
export class NotFoundComponent implements OnInit {
  public path = '';

  constructor(public location: Location, private router: Router, private head: HeadService) {
    this.head.metadata = {
      title: '404: Not Found',
      description: 'The requested page does not exist.',
      canonicalUrl: 'https://ardis.lu/404'
    };
  }

  ngOnInit(): void {
    const allPaths = this.router.config.map(r => r.path);
    const fuse = new Fuse(allPaths); // Fuzzy matcher
    this.path = fuse.search(location.pathname)?.[0]?.item ?? '';
  }
}

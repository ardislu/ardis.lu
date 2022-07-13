import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonLoaderComponent } from '@components/skeleton-loader.component';
import { ProjectCard } from '@models/project.model';
import { ProjectCardService } from '@services/strapi.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent, NotificationDialogData } from '@components/notification-dialog.component';
import { Observable } from 'rxjs';

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
      <ng-container *ngIf="projectCards$ | async as projectCards; else loading">
        <mat-card *ngFor="let project of projectCards">
          <mat-card-title>
            <div>{{ project.title }}</div>
          </mat-card-title>
          <mat-card-content>
            {{ project.description }}
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="accent" (click)="openProject(project.route)">
              EXPLORE
            </button>
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
  `]
})
export class HomeComponent implements OnInit {
  public projectCards$!: Observable<ProjectCard[]>;
  public placeholderCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(private project: ProjectCardService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectCards$ = this.project.list();
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
    else {
      this.router.navigate([`/${project}`]);
    }
  }

}

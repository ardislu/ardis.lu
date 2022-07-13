import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonLoaderComponent } from '../../components/skeleton-loader/skeleton-loader.component';
import { ProjectCard } from '../../models/project.model';
import { ProjectCardService } from '../../services/strapi.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent, NotificationDialogData } from '../../components/notification-dialog/notification-dialog.component';
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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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

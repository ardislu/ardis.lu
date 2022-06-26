import { Component, OnInit } from '@angular/core';
import { ProjectCard } from '../../models/project.model';
import { ProjectCardService } from '../../services/strapi.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent, NotificationDialogData } from '../../components/dialog/notification/notification-dialog.component';
import { Observable } from 'rxjs';

@Component({
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { ProjectCard } from '../../models/project.model';
import { ProjectCardService } from '../../services/strapi.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent, NotificationDialogData } from '../../components/dialog/notification/notification-dialog.component';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public projectCards$!: Observable<ProjectCard[]>;
  public placeholderCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Layout defaults
  public containerStyle = {
    width: 'calc(100% - 20px)',
    'padding-top': '20px'
  };
  // Known Angular bug: the '!important' CSS property will not be applied when using [ngStyle] or [style.xxx]
  // https://github.com/angular/angular/issues/12009
  // Workaround: use a class containing this single style. Remember to update the SCSS classes whenever the gutters are updated.
  public containerMarginClass = 'container-margin-md';
  public layoutGap = '20px grid';
  public columnPercent = '33.333%';

  // Layout lookup tables
  // Remember to update the SCSS classes whenever the gutters are updated.
  private gutters: { [key: string]: string } = {
    xs: '10px',
    sm: '15px',
    md: '20px',
    lg: '24px',
    xl: '24px'
  };
  private columns: { [key: string]: number } = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  };

  // To unsubscribe all other observables on component destruction
  private readonly destroy$ = new Subject<void>();

  constructor(private project: ProjectCardService, private media: MediaObserver, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.projectCards$ = this.project.list();

    this.media.asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0]),
        takeUntil(this.destroy$)
      ).subscribe((change: MediaChange) => this.configLayout(change.mqAlias));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  configLayout(breakpoint: string): void {
    const gap = this.gutters[breakpoint];

    this.containerStyle = {
      width: `calc(100% - ${gap})`,
      'padding-top': gap
    };
    this.containerMarginClass = `container-margin-${breakpoint}`; // MUST be a class. Can't merge with containerStyle.
    this.layoutGap = `${gap} grid`;
    this.columnPercent = `${(1 / this.columns[breakpoint] * 100).toFixed(3)}%`;
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

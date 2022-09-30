import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@services/auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  selector: 'app-header',
  template: `
    <mat-toolbar aria-label="Header">
      <a aria-label="Home" routerLink="" mat-icon-button class="logo">
        <mat-icon svgIcon="logo"></mat-icon>
      </a>
      <button aria-label="Login" mat-icon-button (click)="auth.login()" *ngIf="!auth.loggedIn">
        <mat-icon svgIcon="login"></mat-icon>
      </button>
      <a aria-label="Settings" mat-icon-button routerLink="settings" *ngIf="auth.loggedIn">
        <mat-icon svgIcon="settings"></mat-icon>
      </a>
      <a aria-label="About" mat-icon-button routerLink="about">
        <mat-icon svgIcon="info"></mat-icon>
      </a>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      display: flex;
      justify-content: flex-end;
    }

    .logo {
      margin-inline-end: auto;
    }
  `]
})
export class HeaderComponent {
  constructor(public auth: AuthService) { }
}

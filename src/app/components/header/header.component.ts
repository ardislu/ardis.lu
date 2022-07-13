import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

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
    <!-- Toolbar -->
    <mat-toolbar aria-label="Header" class="header">
      <a aria-label="Home" routerLink="" mat-icon-button>
        <mat-icon svgIcon="logo"></mat-icon>
      </a>
      <div class="fill-space"></div>
      <button aria-label="Login" mat-icon-button (click)="auth.login()" *ngIf="!auth.loggedIn">
        <mat-icon svgIcon="login"></mat-icon>
      </button>
      <button aria-label="Settings" mat-icon-button routerLink="settings" *ngIf="auth.loggedIn">
        <mat-icon svgIcon="settings"></mat-icon>
      </button>
      <button aria-label="About" mat-icon-button routerLink="about">
        <mat-icon svgIcon="info"></mat-icon>
      </button>
    </mat-toolbar>

    <!-- Intentionally blank, to give spacing since the header is fixed -->
    <div class="false-header mat-app-background"></div>
  `,
  styles: [`
    .header {
      padding-top: env(safe-area-inset-top); // Fill top status bar for iOS
      height: calc(44px + env(safe-area-inset-top));
      padding-left: 16px;
      padding-right: 16px;
      position: fixed;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      z-index: 1000;
    }

    .false-header {
      padding-top: env(safe-area-inset-top);
      height: calc(44px + env(safe-area-inset-top));
      z-index: 0;
      position: relative;
    }
  `]
})
export class HeaderComponent {
  constructor(public auth: AuthService) { }
}

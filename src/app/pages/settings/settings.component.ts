import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DialogModule } from '../../components/dialog/dialog.module';
import { SkeletonLoaderComponent } from '../../components/skeleton-loader/skeleton-loader.component';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { BaseTheme } from '../../models/theme.model';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogData, ConfirmationDialogComponent } from '../../components/dialog/confirmation/confirmation-dialog.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    DialogModule,
    SkeletonLoaderComponent
  ],
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public themeList$!: Observable<BaseTheme[]>;
  public themeSelection!: BaseTheme;

  constructor(public auth: AuthService, public theme: ThemeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.themeList$ = this.theme.list();
    this.themeSelection = this.theme.selectedTheme;
  }

  logout(): void {
    const data: ConfirmationDialogData = {
      title: 'Logout?',
      body: 'Are you sure you want to logout?',
      confirmButtonText: 'LOGOUT',
      rejectButtonText: 'CANCEL'
    };
    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, { data });
    confirmationDialog.afterClosed().subscribe((confirmed: boolean) => { if (confirmed) { this.auth.logout(); } });
  }

}

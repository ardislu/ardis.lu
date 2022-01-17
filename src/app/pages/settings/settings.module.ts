import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { DialogModule } from '../../components/dialog/dialog.module';
import { LoaderModule } from 'src/app/components/loader/loader.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    DialogModule,
    LoaderModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }

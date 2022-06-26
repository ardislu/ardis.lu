import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DialogModule } from '../../components/dialog/dialog.module';

import { LoaderModule } from 'src/app/components/loader/loader.module';

import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DialogModule,
    LoaderModule,
    LayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HomeModule { }

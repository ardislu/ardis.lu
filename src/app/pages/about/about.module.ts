import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

import { LoaderModule } from 'src/app/components/loader/loader.module';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    LoaderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AboutModule { }

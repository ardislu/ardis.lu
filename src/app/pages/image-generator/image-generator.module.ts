import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageGeneratorRoutingModule } from './image-generator-routing.module';
import { ImageGeneratorComponent } from './image-generator.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { RandomImageComponent } from '../../components/random-image/random-image.component';

@NgModule({
  declarations: [ImageGeneratorComponent],
  imports: [
    CommonModule,
    ImageGeneratorRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    RandomImageComponent
  ]
})
export class ImageGeneratorModule { }

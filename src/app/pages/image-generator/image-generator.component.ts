import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RandomImageComponent } from '../../components/random-image/random-image.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    RandomImageComponent
  ],
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.scss']
})
export class ImageGeneratorComponent implements OnInit {
  public inputValue!: string;
  public seed!: string;
  public length = 800;
  public inputChanged: Subject<void | string> = new Subject<void | string>();

  ngOnInit(): void {
    // Set a 300 ms wait time between input events before proceeding
    this.inputChanged.pipe(debounceTime(300)).subscribe(() => this.seed = this.inputValue);

    this.resizeCanvas();
    this.randSeed();
  }

  resizeCanvas(): void {
    const maxCanvasHeight = Math.floor(window.innerHeight * 0.85);
    const maxCanvasWidth = Math.floor(window.innerWidth * 0.85);
    this.length = Math.min(maxCanvasHeight, maxCanvasWidth);
  }

  randSeed(): void {
    const newVal = Math.random().toString();
    this.inputValue = newVal;
    this.seed = newVal;
  }

}

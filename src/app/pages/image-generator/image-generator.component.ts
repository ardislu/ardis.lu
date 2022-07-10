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
  template: `
    <mat-card class="image-card">
      <mat-card-title>
        <div>Image Generator</div>
      </mat-card-title>

      <mat-card-content>
        The image below is procedurally generated and rendered using the HTML5 Canvas element. Enter a new seed below to
        generate a new image, or click the dice icon to generate a new random seed.
      </mat-card-content>

      <mat-card-content>
        <mat-form-field>
          <mat-label>Seed</mat-label>
          <input matInput [(ngModel)]="inputValue" (ngModelChange)="inputChanged.next()">
        </mat-form-field>
        <button mat-icon-button (click)="randSeed()">
          <mat-icon svgIcon="dice"></mat-icon>
        </button>
        <mat-divider></mat-divider>
      </mat-card-content>

      <mat-card-content class="canvas-container">
        <app-random-image [seed]="seed" [circleCount]="length/2" [width]="length" [height]="length"></app-random-image>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button color="accent" routerLink="/">
          HOME
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .image-card {
      width: 85%;
      margin: min(5%, 5em) auto;
      white-space: pre-wrap;
    }

    .canvas-container {
      text-align: center;
    }
  `]
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

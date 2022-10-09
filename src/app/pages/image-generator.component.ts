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
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { HeadService } from '@services/head.service';
import { RandomImageComponent } from '@components/random-image.component';

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
    <mat-card>
      <mat-card-title>Image Generator</mat-card-title>

      <mat-card-content>
        <p>
          The image below is procedurally generated and rendered using the HTML5 Canvas element. Enter a new seed below to
          generate a new image, or click the dice icon to generate a new random seed.
        </p>

        <div class="seed-container">
          <mat-form-field>
            <mat-label>Seed</mat-label>
            <input matInput [(ngModel)]="inputValue" (ngModelChange)="inputChanged.next()">
          </mat-form-field>
          <button mat-icon-button (click)="randSeed()">
            <mat-icon svgIcon="dice"></mat-icon>
          </button>
        </div>

        <app-random-image [seed]="seed" [circleCount]="150"></app-random-image>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button color="accent" routerLink="/">
          HOME
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    mat-card {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      inline-size: min(100% - 2rem, 720px);
      block-size: min(100vh - 2rem - 40px, 720px);
      margin-inline: auto;
      margin-block: 1rem;
    }

    mat-card-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin: 0;
    }

    .seed-container {
      display: flex;
      align-items: center;
    }

    .seed-container > mat-form-field {
      flex-grow: 1;
    }

    app-random-image {
      /* MUST set height to less than actual space available, otherwise flex-grow: 1
      will add 5px every time this element is refreshed. */
      height: 1px;
      flex-grow: 1;
    }
  `]
})
export class ImageGeneratorComponent implements OnInit {
  public inputValue!: string;
  public seed!: string;
  public inputChanged: Subject<void | string> = new Subject<void | string>();

  constructor(private head: HeadService) {
    this.head.metadata = {
      title: 'image-generator',
      description: 'Random image generator.',
      canonicalUrl: 'https://ardis.lu/image-generator'
    };
  }

  ngOnInit(): void {
    // Set a 300 ms wait time between input events before proceeding
    this.inputChanged.pipe(debounceTime(300)).subscribe(() => this.seed = this.inputValue);
    this.randSeed();
  }

  randSeed(): void {
    const newVal = Math.random().toString();
    this.inputValue = newVal;
    this.seed = newVal;
  }
}

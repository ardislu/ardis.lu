import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SnakeGameComponent } from '@components/snake-game.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    SnakeGameComponent
  ],
  selector: 'app-snek',
  template: `
    <mat-card>
      <mat-card-title>
        snek
      </mat-card-title>
      <mat-card-subtitle>
        this is snek // high: {{ highScore }} // last: {{ lastScore }}
      </mat-card-subtitle>

      <mat-card-content>
        <app-snake-game #game [gridSize]="gameGrid" [width]="gameWidth" [height]="gameHeight"
          (gameEnded)="recordScore($event)"></app-snake-game>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button color="primary" (click)="restart()">RESTART</button>
        <button mat-button color="accent" routerLink="/">HOME</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    mat-card {
      box-sizing: border-box;
      inline-size: min(100% - 2rem, 480px);
      margin-inline: auto;
      margin-block-start: 1rem;
    }

    mat-card-content {
      text-align: center;
    }
  `]
})
export class SnekComponent implements OnInit {
  @ViewChild('game', { static: true }) game!: SnakeGameComponent;

  private minGrids = 10; // At least this many squares in any direction
  private actualWidth = 448;
  private actualHeight = 448;

  /* eslint-disable @typescript-eslint/member-ordering -- these variables depend on the private variables */
  public gameGrid = this.actualWidth / this.minGrids;
  public gameWidth = this.actualWidth / this.gameGrid;
  public gameHeight = this.actualHeight / this.gameGrid;
  public lastScore = 0;
  public highScore = 0;
  /* eslint-enable @typescript-eslint/member-ordering */

  ngOnInit(): void {
    this.actualWidth = Math.min(window.innerWidth * 0.7, 448);
    this.actualHeight = Math.min(window.innerHeight * 0.35, 448);

    this.gameGrid = Math.floor(Math.min(this.actualWidth, this.actualHeight) / this.minGrids);

    this.actualWidth -= this.actualWidth % this.gameGrid;
    this.actualHeight -= this.actualHeight % this.gameGrid;

    this.gameWidth = this.actualWidth / this.gameGrid;
    this.gameHeight = this.actualHeight / this.gameGrid;
  }

  restart(): void {
    this.ngOnInit();
    this.game.ngOnInit();
  }

  recordScore(score: number): void {
    this.lastScore = score;
    this.highScore = Math.max(this.highScore, this.lastScore);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
      case 'Spacebar':
        this.game.endGame();
        this.restart();
        break;
      default:
        break;
    }
  }

}

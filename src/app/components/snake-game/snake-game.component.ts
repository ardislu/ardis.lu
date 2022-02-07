import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

import { SnekPiece, SnekPlayer } from '../../models/snek.model';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss']
})
export class SnakeGameComponent implements OnInit {
  @Input() gridSize = 10;
  @Input() width = 25;
  @Input() height = 25;
  @Input() playerColor = '#558dd1';
  @Input() foodColor = '#e7d26a';
  @Output() gameEnded = new EventEmitter<number>();

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private player!: SnekPlayer;
  private food!: SnekPiece;
  private isActive!: boolean;
  private previousRender!: number;
  private gameLoop!: number;
  private gameOverTimer!: number;

  constructor() { }

  ngOnInit(): void {
    this.canvas.nativeElement.width = this.width * this.gridSize;
    this.canvas.nativeElement.height = this.height * this.gridSize;
    this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

    // Initialize player
    const spawnPiece: SnekPiece = {
      x: Math.floor(this.width / 2),
      y: Math.floor(this.height / 2)
    };
    this.player = new SnekPlayer(spawnPiece);

    // Initialize food
    this.spawnFood();

    // Begin game loop
    this.isActive = true;
    this.previousRender = 0;
    this.gameLoop = window.requestAnimationFrame(this.tick.bind(this));
  }

  tick(timestamp: number): void {
    if (timestamp - this.previousRender > 100) {
      this.previousRender = timestamp;
      this.player = this.move(this.player);
      this.drawCanvas();
    }

    if (this.isActive) {
      this.gameLoop = window.requestAnimationFrame(this.tick.bind(this));
    }
  }

  move(player: SnekPlayer): SnekPlayer {
    let newHead: SnekPiece;
    // Preserve last movement direction if there's no new player input
    if (player.xDirection.length === 1) {
      newHead = {
        x: player.head.x + player.xDirection[0],
        y: player.head.y + player.yDirection[0]
      };
    }
    // Use the next queued movement
    else {
      newHead = {
        x: player.head.x + (player.xDirection.shift() ?? 1),
        y: player.head.y + (player.yDirection.shift() ?? 0)
      };
    }

    // newHead has the same position as a body piece
    if (player.body.some(p => p.x === newHead.x && p.y === newHead.y)) {
      this.endGame();
      return player;
    }

    // newHead went beyond a wall
    const pastWall = newHead.x < 0
      || newHead.x + 1 > this.width
      || newHead.y < 0
      || newHead.y + 1 > this.height;
    if (pastWall) {
      this.gameOverTimer += 1;
      if (this.gameOverTimer > 5) {
        this.endGame();
        return player; // Do not add newHead
      }
      return player;
    }
    else {
      this.gameOverTimer = 0;
    }

    // Extend head by one
    player.body.unshift(newHead);
    if (newHead.x !== this.food.x || newHead.y !== this.food.y) {
      player.body.pop(); // Food not eaten = kill tail piece
    }
    else {
      this.spawnFood(); // Respawn food
    }

    return player;
  }

  spawnFood(): void {
    let newFood: SnekPiece;
    do {
      newFood = {
        x: Math.floor(this.width * Math.random()),
        y: Math.floor(this.height * Math.random())
      };
    } while (this.player.body.some(p => p.x === newFood.x && p.y === newFood.y));
    this.food = newFood;
  }

  drawCanvas(): void {
    const g = this.gridSize;
    const fullW = this.width * g;
    const fullH = this.height * g;

    this.ctx.clearRect(0, 0, fullW, fullH);

    this.ctx.beginPath();
    this.ctx.rect(0, 0, fullW, fullH);
    this.ctx.stroke();

    for (const bodyPiece of this.player.body) {
      const x = bodyPiece.x * g;
      const y = bodyPiece.y * g;
      this.ctx.beginPath();
      this.ctx.fillStyle = this.playerColor;
      this.ctx.fillRect(x, y, g, g);
    }

    const foodX = this.food.x * g;
    const foodY = this.food.y * g;
    this.ctx.fillStyle = this.foodColor;
    this.ctx.fillRect(foodX, foodY, g, g);
  }

  endGame(): void {
    window.cancelAnimationFrame(this.gameLoop);
    this.isActive = false;
    this.gameEnded.emit(this.player.body.length);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    let xInput: -1 | 0 | 1 = 0;
    let yInput: -1 | 0 | 1 = 0;
    switch (event.key) {
      case 'd':
      case 'ArrowRight':
        xInput = 1;
        break;
      case 'a':
      case 'ArrowLeft':
        xInput = -1;
        break;
      case 'w':
      case 'ArrowUp':
        yInput = -1;
        break;
      case 's':
      case 'ArrowDown':
        yInput = 1;
        break;
      default:
        xInput = 0;
        yInput = 0;
    }
    this.changeDirection(xInput, yInput);
  }

  onPan(event: any): void {
    let xInput: -1 | 0 | 1 = 0;
    let yInput: -1 | 0 | 1 = 0;
    switch (event.additionalEvent) {
      case 'panright':
        xInput = 1;
        break;
      case 'panleft':
        xInput = -1;
        break;
      case 'panup':
        yInput = -1;
        break;
      case 'pandown':
        yInput = 1;
        break;
      default:
        xInput = 0;
        yInput = 0;
    }
    this.changeDirection(xInput, yInput);
  }

  changeDirection(xChange: -1 | 0 | 1, yChange: -1 | 0 | 1): void {
    const lastX = this.player.xDirection[this.player.xDirection.length - 1];
    const lastY = this.player.yDirection[this.player.yDirection.length - 1];
    // Only perpendicular inputs are valid
    if (lastX === 0 && xChange) {
      this.player.xDirection.push(xChange);
      this.player.yDirection.push(0);
    }
    else if (lastY === 0 && yChange) {
      this.player.yDirection.push(yChange);
      this.player.xDirection.push(0);
    }
  }

}

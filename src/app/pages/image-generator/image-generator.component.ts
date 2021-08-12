import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.scss']
})
export class ImageGeneratorComponent implements OnInit {
  public inputValue!: string;
  public seed!: string;
  public length = 800;
  public inputChanged: Subject<void | string> = new Subject<void | string>();

  constructor() {
  }

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

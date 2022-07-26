import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-random-image',
  template: `<canvas #canvas></canvas>`,
  styles: ['']
})
export class RandomImageComponent implements OnInit, OnChanges {
  @Input() seed: string = Math.random().toString();
  @Input() circleCount = 600;
  @Input() width = 300;
  @Input() height = 300;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    this.generateImage();
  }

  ngOnChanges(): void {
    this.generateImage();
  }

  generateImage(): void {
    const seed = this.cyrb128(this.seed);
    const pRand = this.sfc32(seed[0], seed[1], seed[2], seed[3]);

    this.canvas.nativeElement.width = this.width;
    this.canvas.nativeElement.height = this.height;

    const ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

    for (let i = 0; i < this.circleCount; i++) {
      const x = Math.floor(pRand() * this.width);
      const y = Math.floor(pRand() * this.height);
      const radius = Math.floor(pRand() * Math.floor(this.width * 0.08));
      const r = Math.floor(pRand() * 255);
      const g = Math.floor(pRand() * 255);
      const b = Math.floor(pRand() * 255);

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fill();
      ctx.closePath();
    }
  }

  /* eslint-disable */
  // Hasher and pseudo-RNG taken from this post:
  // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
  cyrb128(str: string) {
    let h1 = 1779033703, h2 = 3144134277,
      h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
  }

  sfc32(a: number, b: number, c: number, d: number) {
    return () => {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      let t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    };
  }
  /* eslint-enable */

}

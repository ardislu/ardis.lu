import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-skeleton-loader',
  template: `<div class="skeleton-line" *ngFor="let _ of [].constructor(count)"></div>`,
  styles: `
    .skeleton-line {
      inline-size: 100%;
      block-size: 1rem;
      margin-block: 1rem;
      border-radius: 4px;
      animation: shimmer 1s alternate infinite;
      background: hsl(0deg 0% 50%);
    }

    @keyframes shimmer {
      100% {
        background: hsl(0deg 0% 85%);
      }
    }
  `
})
export class SkeletonLoaderComponent {
  @Input() count = 1;
}

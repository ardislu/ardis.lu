import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-skeleton-loader',
  template: `
    @for (_ of [].constructor(count); track null) {
      <div class="skeleton-line"></div>
    }
  `,
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

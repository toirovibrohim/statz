import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-icon',
  imports: [CommonModule],
  template: `
    <div class="hero-icon" [class.small]="size() === 'small'" [class.large]="size() === 'large'">
      @if (heroImage() && heroImage().trim() && !imageError) {
        <img
          [src]="getImageUrl()"
          [alt]="heroName()"
          [title]="heroName()"
          class="hero-image"
          (error)="onImageError($event)"
        />
      } @else {
        <div class="hero-placeholder">?</div>
      }
    </div>
  `,
  styles: `
    .hero-icon {
      width: 64px;
      height: 36px;
      border-radius: 4px;
      overflow: hidden;
      border: 2px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      position: relative;
    }

    .hero-icon:hover {
      border-color: rgba(255, 107, 107, 0.5);
      transform: scale(1.05);
    }

    .hero-icon.small {
      width: 48px;
      height: 27px;
    }

    .hero-icon.large {
      width: 96px;
      height: 54px;
    }

    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .hero-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      color: #666;
      font-size: 1.2rem;
    }
  `,
})
export class HeroIconComponent {
  heroImage = input<string>('');
  heroName = input<string>('Unknown Hero');
  size = input<'small' | 'medium' | 'large'>('medium');
  imageError = false;

  getImageUrl(): string {
    const image = this.heroImage();
    if (!image || !image.trim()) {
      return '';
    }
    // If already a full URL, return as is
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    // Otherwise, prepend the CDN base URL
    return `https://cdn.cloudflare.steamstatic.com${image.startsWith('/') ? image : '/' + image}`;
  }

  onImageError(event: Event): void {
    this.imageError = true;
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}


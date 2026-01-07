import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  template: `
    <div class="stat-card" [class.clickable]="clickable()">
      <div class="stat-icon">{{ icon() }}</div>
      <div class="stat-content">
        <div class="stat-label">{{ label() }}</div>
        <div class="stat-value">{{ value() }}</div>
        @if (subtitle()) {
          <div class="stat-subtitle">{{ subtitle() }}</div>
        }
      </div>
    </div>
  `,
  styles: `
    .stat-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease;
    }

    .stat-card.clickable {
      cursor: pointer;
    }

    .stat-card.clickable:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
      border-color: rgba(255, 107, 107, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .stat-icon {
      font-size: 2.5rem;
      line-height: 1;
    }

    .stat-content {
      flex: 1;
    }

    .stat-label {
      font-size: 0.85rem;
      color: #a8a8a8;
      margin-bottom: 0.25rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #fff;
      line-height: 1.2;
    }

    .stat-subtitle {
      font-size: 0.8rem;
      color: #888;
      margin-top: 0.25rem;
    }
  `,
})
export class StatCardComponent {
  icon = input<string>('📊');
  label = input<string>('Stat');
  value = input<string | number>('0');
  subtitle = input<string>('');
  clickable = input<boolean>(false);
}


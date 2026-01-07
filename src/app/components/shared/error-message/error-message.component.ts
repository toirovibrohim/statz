import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  template: `
    <div class="error-container">
      <div class="error-icon">⚠️</div>
      <h3 class="error-title">{{ title() }}</h3>
      <p class="error-message">{{ message() }}</p>
    </div>
  `,
  styles: `
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
      background: rgba(255, 107, 107, 0.1);
      border: 1px solid rgba(255, 107, 107, 0.3);
      border-radius: 8px;
      margin: 2rem 0;
    }

    .error-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .error-title {
      color: #ff6b6b;
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
    }

    .error-message {
      color: #e8e8e8;
      margin: 0;
      font-size: 1rem;
    }
  `,
})
export class ErrorMessageComponent {
  title = input<string>('Error');
  message = input<string>('Something went wrong. Please try again.');
}


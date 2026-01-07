import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  template: `
    <div class="spinner-container">
      <div class="spinner"></div>
      <p class="loading-text">Loading...</p>
    </div>
  `,
  styles: `
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      gap: 1rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-top-color: #ff6b6b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .loading-text {
      color: #a8a8a8;
      font-size: 0.9rem;
      margin: 0;
    }
  `,
})
export class LoadingSpinnerComponent {}


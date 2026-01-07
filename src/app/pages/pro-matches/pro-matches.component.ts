import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OpenDotaService } from '../../services/opendota.service';
import { ProMatch } from '../../models/dota.models';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-pro-matches',
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './pro-matches.component.html',
  styleUrl: './pro-matches.component.scss',
})
export class ProMatchesComponent implements OnInit {
  private readonly openDotaService = inject(OpenDotaService);

  proMatches = signal<ProMatch[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadProMatches();
  }

  loadProMatches(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.openDotaService.getProMatches(50).subscribe({
      next: (matches) => {
        this.proMatches.set(matches);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load pro matches');
        this.isLoading.set(false);
      },
    });
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  formatDuration(seconds: number): string {
    return this.openDotaService.formatDuration(seconds);
  }

  refresh(): void {
    this.loadProMatches();
  }
}


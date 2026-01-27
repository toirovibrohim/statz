import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OpenDotaService } from '../../services/opendota.service';
import { PlayerSearchResult } from '../../models/dota.models';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../components/shared/error-message/error-message.component';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private readonly openDotaService = inject(OpenDotaService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  searchQuery = signal('');
  searchResults = signal<PlayerSearchResult[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  hasSearched = signal(false);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const query = params['q'] || '';
      if (query) {
        this.searchQuery.set(query);
        this.performSearch(query);
      }
    });
  }

  onSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    const query = this.searchQuery().trim();
    if (query.length >= 2) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
      // performSearch will be called automatically via queryParams subscription
    }
  }

  performSearch(query: string): void {
    if (!query || query.trim().length < 2) {
      this.searchResults.set([]);
      this.hasSearched.set(false);
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.hasSearched.set(true);

    this.openDotaService.searchPlayers(query.trim()).subscribe({
      next: (results) => {
        this.searchResults.set(results);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to search players');
        this.searchResults.set([]);
        this.isLoading.set(false);
      },
    });
  }

  selectPlayer(player: PlayerSearchResult): void {
    this.router.navigate(['/player', player.account_id]);
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
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
}

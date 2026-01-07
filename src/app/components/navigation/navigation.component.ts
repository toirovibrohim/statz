import { Component, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OpenDotaService } from '../../services/opendota.service';
import { PlayerSearchResult } from '../../models/dota.models';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnDestroy {
  private readonly openDotaService = inject(OpenDotaService);
  private readonly router = inject(Router);
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  searchQuery = signal('');
  searchResults = signal<PlayerSearchResult[]>([]);
  isSearching = signal(false);
  showResults = signal(false);
  mobileMenuOpen = signal(false);

  constructor() {
    // Setup search with debounce
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query.trim().length < 2) {
            this.isSearching.set(false);
            return of([]);
          }
          this.isSearching.set(true);
          return this.openDotaService.searchPlayers(query);
        })
      )
      .subscribe({
        next: (results) => {
          this.searchResults.set(results.slice(0, 8));
          this.isSearching.set(false);
          this.showResults.set(true);
        },
        error: () => {
          this.isSearching.set(false);
          this.searchResults.set([]);
        },
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.searchSubject.complete();
  }

  onSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);
    this.searchSubject.next(query);
  }

  selectPlayer(player: PlayerSearchResult): void {
    this.router.navigate(['/player', player.account_id]);
    this.clearSearch();
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.showResults.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}


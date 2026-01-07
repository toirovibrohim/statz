import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OpenDotaService } from '../../services/opendota.service';
import { Hero, HeroStats } from '../../models/dota.models';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../components/shared/error-message/error-message.component';
import { HeroIconComponent } from '../../components/shared/hero-icon/hero-icon.component';

type SortField = 'name' | 'winrate' | 'pickrate' | 'attribute';
type FilterAttribute = 'all' | 'str' | 'agi' | 'int';

@Component({
  selector: 'app-heroes',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    HeroIconComponent,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  private readonly openDotaService = inject(OpenDotaService);

  heroes = signal<Hero[]>([]);
  heroStats = signal<HeroStats[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  searchQuery = signal('');
  sortField = signal<SortField>('name');
  filterAttribute = signal<FilterAttribute>('all');

  filteredAndSortedHeroes = computed(() => {
    let result = [...this.heroes()];

    // Filter by search query
    const query = this.searchQuery().toLowerCase();
    if (query) {
      result = result.filter((hero) => hero.localized_name.toLowerCase().includes(query));
    }

    // Filter by attribute
    const attr = this.filterAttribute();
    if (attr !== 'all') {
      result = result.filter((hero) => hero.primary_attr === attr);
    }

    // Sort
    const sort = this.sortField();
    result.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.localized_name.localeCompare(b.localized_name);
        case 'winrate': {
          const aStats = this.getHeroStats(a.id);
          const bStats = this.getHeroStats(b.id);
          const aWinRate = aStats && aStats.pro_pick > 0 ? aStats.pro_win / aStats.pro_pick : 0;
          const bWinRate = bStats && bStats.pro_pick > 0 ? bStats.pro_win / bStats.pro_pick : 0;
          return bWinRate - aWinRate;
        }
        case 'pickrate': {
          const aStats = this.getHeroStats(a.id);
          const bStats = this.getHeroStats(b.id);
          return (bStats?.pro_pick || 0) - (aStats?.pro_pick || 0);
        }
        case 'attribute':
          return a.primary_attr.localeCompare(b.primary_attr);
        default:
          return 0;
      }
    });

    return result;
  });

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.openDotaService.getHeroes().subscribe({
      next: (heroes) => {
        this.heroes.set(heroes);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load heroes');
        this.isLoading.set(false);
      },
    });

    this.openDotaService.getHeroStats().subscribe({
      next: (stats) => {
        this.heroStats.set(stats);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading hero stats:', err);
        this.isLoading.set(false);
      },
    });
  }

  getHeroStats(heroId: number): HeroStats | undefined {
    return this.heroStats().find((s) => s.id === heroId);
  }

  getWinRate(heroId: number): string {
    const stats = this.getHeroStats(heroId);
    if (!stats || stats.pro_pick === 0) {
      return 'N/A';
    }
    return ((stats.pro_win / stats.pro_pick) * 100).toFixed(1) + '%';
  }

  getPickCount(heroId: number): number {
    const stats = this.getHeroStats(heroId);
    return stats?.pro_pick || 0;
  }

  onSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);
  }

  setSortField(field: SortField): void {
    this.sortField.set(field);
  }

  setFilterAttribute(attr: FilterAttribute): void {
    this.filterAttribute.set(attr);
  }

  getAttributeIcon(attr: string): string {
    switch (attr) {
      case 'str':
        return '💪';
      case 'agi':
        return '⚡';
      case 'int':
        return '🧠';
      default:
        return '❓';
    }
  }

  getAttributeName(attr: string): string {
    switch (attr) {
      case 'str':
        return 'Strength';
      case 'agi':
        return 'Agility';
      case 'int':
        return 'Intelligence';
      default:
        return attr;
    }
  }
}


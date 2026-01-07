import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OpenDotaService } from '../../services/opendota.service';
import { Hero, HeroStats, ProMatch } from '../../models/dota.models';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../components/shared/error-message/error-message.component';
import { StatCardComponent } from '../../components/shared/stat-card/stat-card.component';
import { HeroIconComponent } from '../../components/shared/hero-icon/hero-icon.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    StatCardComponent,
    HeroIconComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly openDotaService = inject(OpenDotaService);

  heroes = signal<Hero[]>([]);
  heroStats = signal<HeroStats[]>([]);
  proMatches = signal<ProMatch[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  topHeroes = signal<HeroStats[]>([]);
  totalHeroes = signal(0);
  recentProMatches = signal<ProMatch[]>([]);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Load heroes
    this.openDotaService.getHeroes().subscribe({
      next: (heroes) => {
        this.heroes.set(heroes);
        this.totalHeroes.set(heroes.length);
      },
      error: (err) => {
        console.error('Error loading heroes:', err);
      },
    });

    // Load hero stats
    this.openDotaService.getHeroStats().subscribe({
      next: (stats) => {
        this.heroStats.set(stats);
        // Get top 6 heroes by pick rate
        const sorted = [...stats].sort((a, b) => {
          const aTotal = a['1_pick'] + a['2_pick'] + a['3_pick'] + a['4_pick'] + a['5_pick'];
          const bTotal = b['1_pick'] + b['2_pick'] + b['3_pick'] + b['4_pick'] + b['5_pick'];
          return bTotal - aTotal;
        });
        this.topHeroes.set(sorted.slice(0, 6));
      },
      error: (err) => {
        console.error('Error loading hero stats:', err);
      },
    });

    // Load pro matches
    this.openDotaService.getProMatches(10).subscribe({
      next: (matches) => {
        this.proMatches.set(matches);
        this.recentProMatches.set(matches.slice(0, 5));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading pro matches:', err);
        this.error.set(err.message || 'Failed to load data');
        this.isLoading.set(false);
      },
    });
  }

  getHeroById(heroId: number): Hero | undefined {
    return this.heroes().find((h) => h.id === heroId);
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
}


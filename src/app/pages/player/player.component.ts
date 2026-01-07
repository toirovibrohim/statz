import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { OpenDotaService } from '../../services/opendota.service';
import { Player, Match, Hero, PlayerWinLoss } from '../../models/dota.models';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../components/shared/error-message/error-message.component';
import { HeroIconComponent } from '../../components/shared/hero-icon/hero-icon.component';
import { StatCardComponent } from '../../components/shared/stat-card/stat-card.component';

@Component({
  selector: 'app-player',
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    HeroIconComponent,
    StatCardComponent,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit {
  private readonly openDotaService = inject(OpenDotaService);
  private readonly route = inject(ActivatedRoute);

  player = signal<Player | null>(null);
  matches = signal<Match[]>([]);
  winLoss = signal<PlayerWinLoss | null>(null);
  heroes = signal<Hero[]>([]);
  playerHeroes = signal<any[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const accountId = +params['id'];
      if (accountId) {
        this.loadPlayerData(accountId);
      }
    });

    // Load heroes for reference
    this.openDotaService.getHeroes().subscribe({
      next: (heroes) => this.heroes.set(heroes),
      error: (err) => console.error('Error loading heroes:', err),
    });
  }

  loadPlayerData(accountId: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Load player profile
    this.openDotaService.getPlayer(accountId).subscribe({
      next: (player) => {
        this.player.set(player);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load player data');
        this.isLoading.set(false);
      },
    });

    // Load win/loss
    this.openDotaService.getPlayerWinLoss(accountId).subscribe({
      next: (wl) => this.winLoss.set(wl),
      error: (err) => console.error('Error loading win/loss:', err),
    });

    // Load recent matches
    this.openDotaService.getPlayerMatches(accountId, 20).subscribe({
      next: (matches) => {
        this.matches.set(matches);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading matches:', err);
        this.isLoading.set(false);
      },
    });

    // Load player heroes
    this.openDotaService.getPlayerHeroes(accountId).subscribe({
      next: (playerHeroes) => {
        this.playerHeroes.set(playerHeroes.slice(0, 10));
      },
      error: (err) => console.error('Error loading player heroes:', err),
    });
  }

  getHeroById(heroId: number): Hero | undefined {
    return this.heroes().find((h) => h.id === heroId);
  }

  getWinRate(): number {
    const wl = this.winLoss();
    if (!wl || wl.win + wl.lose === 0) return 0;
    return (wl.win / (wl.win + wl.lose)) * 100;
  }

  getTotalGames(): number {
    const wl = this.winLoss();
    return wl ? wl.win + wl.lose : 0;
  }

  getMatchResult(match: Match): 'won' | 'lost' {
    const isRadiant = match.player_slot < 128;
    return (isRadiant && match.radiant_win) || (!isRadiant && !match.radiant_win) ? 'won' : 'lost';
  }

  getKDA(match: Match): string {
    const kda = this.openDotaService.calculateKDA(match.kills, match.deaths, match.assists);
    return kda.toFixed(2);
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  formatDuration(seconds: number): string {
    return this.openDotaService.formatDuration(seconds);
  }

  getRankTier(): string {
    const rank = this.player()?.rank_tier;
    if (!rank) return 'Unranked';
    const tier = rank % 10;
    const medal = Math.floor(rank / 10);
    const medals = ['', 'Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'];
    return `${medals[medal]} ${tier}`;
  }
}


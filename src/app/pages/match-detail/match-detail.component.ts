import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { OpenDotaService } from '../../services/opendota.service';
import { MatchDetail, Hero, MatchPlayer } from '../../models/dota.models';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../components/shared/error-message/error-message.component';
import { HeroIconComponent } from '../../components/shared/hero-icon/hero-icon.component';

@Component({
  selector: 'app-match-detail',
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    HeroIconComponent,
  ],
  templateUrl: './match-detail.component.html',
  styleUrl: './match-detail.component.scss',
})
export class MatchDetailComponent implements OnInit {
  private readonly openDotaService = inject(OpenDotaService);
  private readonly route = inject(ActivatedRoute);

  match = signal<MatchDetail | null>(null);
  heroes = signal<Hero[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  radiantPlayers = signal<MatchPlayer[]>([]);
  direPlayers = signal<MatchPlayer[]>([]);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const matchId = +params['id'];
      if (matchId) {
        this.loadMatchData(matchId);
      }
    });

    // Load heroes for reference
    this.openDotaService.getHeroes().subscribe({
      next: (heroes) => this.heroes.set(heroes),
      error: (err) => console.error('Error loading heroes:', err),
    });
  }

  loadMatchData(matchId: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.openDotaService.getMatchDetails(matchId).subscribe({
      next: (match) => {
        this.match.set(match);
        // Split players into Radiant and Dire
        const radiant = match.players.filter((p) => p.player_slot < 128);
        const dire = match.players.filter((p) => p.player_slot >= 128);
        this.radiantPlayers.set(radiant);
        this.direPlayers.set(dire);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load match data');
        this.isLoading.set(false);
      },
    });
  }

  getHeroById(heroId: number): Hero | undefined {
    return this.heroes().find((h) => h.id === heroId);
  }

  formatDuration(seconds: number): string {
    return this.openDotaService.formatDuration(seconds);
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }

  getKDA(player: MatchPlayer): string {
    return this.openDotaService.calculateKDA(player.kills, player.deaths, player.assists).toFixed(2);
  }

  getGameMode(mode: number): string {
    const modes: { [key: number]: string } = {
      0: 'Unknown',
      1: 'All Pick',
      2: 'Captains Mode',
      3: 'Random Draft',
      4: 'Single Draft',
      5: 'All Random',
      22: 'Ranked All Pick',
      23: 'Turbo',
    };
    return modes[mode] || `Mode ${mode}`;
  }

  getLobbyType(type: number): string {
    const types: { [key: number]: string } = {
      0: 'Normal',
      1: 'Practice',
      2: 'Tournament',
      7: 'Ranked',
    };
    return types[type] || `Lobby ${type}`;
  }

  getPlayerItem(player: MatchPlayer, slot: number): number | undefined {
    switch (slot) {
      case 0:
        return player.item_0;
      case 1:
        return player.item_1;
      case 2:
        return player.item_2;
      case 3:
        return player.item_3;
      case 4:
        return player.item_4;
      case 5:
        return player.item_5;
      default:
        return undefined;
    }
  }
}


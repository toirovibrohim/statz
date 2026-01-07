import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { OpenDotaService } from '../../services/opendota.service';
import { Hero, HeroStats } from '../../models/dota.models';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../components/shared/error-message/error-message.component';
import { HeroIconComponent } from '../../components/shared/hero-icon/hero-icon.component';
import { StatCardComponent } from '../../components/shared/stat-card/stat-card.component';

@Component({
  selector: 'app-hero-detail',
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    HeroIconComponent,
    StatCardComponent,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent implements OnInit {
  private readonly openDotaService = inject(OpenDotaService);
  private readonly route = inject(ActivatedRoute);

  hero = signal<Hero | null>(null);
  heroStats = signal<HeroStats | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const heroId = +params['id'];
      if (heroId) {
        this.loadHeroData(heroId);
      }
    });
  }

  loadHeroData(heroId: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.openDotaService.getHeroes().subscribe({
      next: (heroes) => {
        const hero = heroes.find((h) => h.id === heroId);
        if (hero) {
          this.hero.set(hero);
        } else {
          this.error.set('Hero not found');
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load hero data');
        this.isLoading.set(false);
      },
    });

    this.openDotaService.getHeroStats().subscribe({
      next: (stats) => {
        const heroStat = stats.find((s) => s.id === heroId);
        if (heroStat) {
          this.heroStats.set(heroStat);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading hero stats:', err);
        this.isLoading.set(false);
      },
    });
  }

  getProWinRate(): string {
    const stats = this.heroStats();
    if (!stats || stats.pro_pick === 0) return 'N/A';
    return ((stats.pro_win / stats.pro_pick) * 100).toFixed(1) + '%';
  }

  getBracketWinRate(bracket: string): string {
    const stats = this.heroStats();
    if (!stats) return 'N/A';
    const picks = this.getBracketPicks(bracket);
    const wins = this.getBracketWins(bracket);
    if (!picks || picks === 0) return 'N/A';
    return ((wins / picks) * 100).toFixed(1) + '%';
  }

  getBracketPicks(bracket: string): number {
    const stats = this.heroStats();
    if (!stats) return 0;
    switch (bracket) {
      case '1':
        return stats['1_pick'] || 0;
      case '2':
        return stats['2_pick'] || 0;
      case '3':
        return stats['3_pick'] || 0;
      case '4':
        return stats['4_pick'] || 0;
      case '5':
        return stats['5_pick'] || 0;
      case '6':
        return stats['6_pick'] || 0;
      case '7':
        return stats['7_pick'] || 0;
      case '8':
        return stats['8_pick'] || 0;
      default:
        return 0;
    }
  }

  getBracketWins(bracket: string): number {
    const stats = this.heroStats();
    if (!stats) return 0;
    switch (bracket) {
      case '1':
        return stats['1_win'] || 0;
      case '2':
        return stats['2_win'] || 0;
      case '3':
        return stats['3_win'] || 0;
      case '4':
        return stats['4_win'] || 0;
      case '5':
        return stats['5_win'] || 0;
      case '6':
        return stats['6_win'] || 0;
      case '7':
        return stats['7_win'] || 0;
      case '8':
        return stats['8_win'] || 0;
      default:
        return 0;
    }
  }

  getBracketName(bracket: string): string {
    const names: { [key: string]: string } = {
      '1': 'Herald',
      '2': 'Guardian',
      '3': 'Crusader',
      '4': 'Archon',
      '5': 'Legend',
      '6': 'Ancient',
      '7': 'Divine',
      '8': 'Immortal',
    };
    return names[bracket] || bracket;
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

  getAttackType(type: string): string {
    return type === 'Melee' ? '⚔️ Melee' : '🏹 Ranged';
  }
}


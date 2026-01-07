import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, shareReplay, map } from 'rxjs/operators';
import {
  PlayerSearchResult,
  Player,
  Match,
  MatchDetail,
  Hero,
  HeroStats,
  ProMatch,
  PlayerWinLoss,
} from '../models/dota.models';

@Injectable({
  providedIn: 'root',
})
export class OpenDotaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.opendota.com/api';

  // Cache for heroes data (rarely changes)
  private heroesCache$?: Observable<Hero[]>;
  private heroStatsCache$?: Observable<HeroStats[]>;

  /**
   * Search for players by name
   * @param query - Player name to search
   */
  searchPlayers(query: string): Observable<PlayerSearchResult[]> {
    if (!query || query.trim().length < 2) {
      return of([]);
    }
    return this.http
      .get<PlayerSearchResult[]>(`${this.baseUrl}/search`, {
        params: { q: query.trim() },
      })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Get player profile by account ID
   * @param accountId - Steam account ID
   */
  getPlayer(accountId: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/players/${accountId}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Get player win/loss statistics
   * @param accountId - Steam account ID
   */
  getPlayerWinLoss(accountId: number): Observable<PlayerWinLoss> {
    return this.http
      .get<PlayerWinLoss>(`${this.baseUrl}/players/${accountId}/wl`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Get player recent matches
   * @param accountId - Steam account ID
   * @param limit - Number of matches to retrieve (default 20)
   */
  getPlayerMatches(accountId: number, limit: number = 20): Observable<Match[]> {
    return this.http
      .get<Match[]>(`${this.baseUrl}/players/${accountId}/matches`, {
        params: { limit: limit.toString() },
      })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Get player heroes statistics
   * @param accountId - Steam account ID
   */
  getPlayerHeroes(accountId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/players/${accountId}/heroes`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Get all heroes data (cached)
   */
  getHeroes(): Observable<Hero[]> {
    if (!this.heroesCache$) {
      this.heroesCache$ = this.http.get<Hero[]>(`${this.baseUrl}/heroes`).pipe(
        retry(2),
        shareReplay(1),
        catchError(this.handleError)
      );
    }
    return this.heroesCache$;
  }

  /**
   * Get hero statistics (cached)
   */
  getHeroStats(): Observable<HeroStats[]> {
    if (!this.heroStatsCache$) {
      this.heroStatsCache$ = this.http
        .get<HeroStats[]>(`${this.baseUrl}/heroStats`)
        .pipe(
          retry(2),
          shareReplay(1),
          catchError(this.handleError)
        );
    }
    return this.heroStatsCache$;
  }

  /**
   * Get match details by match ID
   * @param matchId - Match ID
   */
  getMatchDetails(matchId: number): Observable<MatchDetail> {
    return this.http.get<MatchDetail>(`${this.baseUrl}/matches/${matchId}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Get recent professional matches
   * @param limit - Number of matches to retrieve (default 20)
   */
  getProMatches(limit: number = 20): Observable<ProMatch[]> {
    return this.http.get<ProMatch[]>(`${this.baseUrl}/proMatches`).pipe(
      map((matches) => matches.slice(0, limit)),
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Get public matches
   * @param limit - Number of matches to retrieve
   */
  getPublicMatches(limit: number = 20): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/publicMatches`).pipe(
      map((matches) => matches.slice(0, limit)),
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Clear heroes cache (useful for manual refresh)
   */
  clearCache(): void {
    this.heroesCache$ = undefined;
    this.heroStatsCache$ = undefined;
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'No connection. Please check your internet.';
          break;
        case 429:
          errorMessage = 'Rate limit exceeded. Please try again later.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    console.error('OpenDota API Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Get hero name by ID
   * @param heroId - Hero ID
   */
  getHeroById(heroId: number): Observable<Hero | undefined> {
    return new Observable((observer) => {
      this.getHeroes().subscribe({
        next: (heroes) => {
          const hero = heroes.find((h) => h.id === heroId);
          observer.next(hero);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  /**
   * Format duration in seconds to readable format
   */
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  /**
   * Calculate KDA ratio
   */
  calculateKDA(kills: number, deaths: number, assists: number): number {
    if (deaths === 0) {
      return kills + assists;
    }
    return parseFloat(((kills + assists) / deaths).toFixed(2));
  }

  /**
   * Get hero image URL
   */
  getHeroImageUrl(heroName: string): string {
    return `https://cdn.cloudflare.steamstatic.com${heroName}`;
  }

  /**
   * Get item image URL
   */
  getItemImageUrl(itemName: string): string {
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/items/${itemName}_lg.png`;
  }
}


import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'statz - Dashboard',
  },
  {
    path: 'player/:id',
    loadComponent: () =>
      import('./pages/player/player.component').then((m) => m.PlayerComponent),
    title: 'Player Profile - statz',
  },
  {
    path: 'heroes',
    loadComponent: () =>
      import('./pages/heroes/heroes.component').then((m) => m.HeroesComponent),
    title: 'Heroes - statz',
  },
  {
    path: 'hero/:id',
    loadComponent: () =>
      import('./pages/hero-detail/hero-detail.component').then((m) => m.HeroDetailComponent),
    title: 'Hero Details - statz',
  },
  {
    path: 'match/:id',
    loadComponent: () =>
      import('./pages/match-detail/match-detail.component').then((m) => m.MatchDetailComponent),
    title: 'Match Details - statz',
  },
  {
    path: 'pro-matches',
    loadComponent: () =>
      import('./pages/pro-matches/pro-matches.component').then((m) => m.ProMatchesComponent),
    title: 'Pro Matches - statz',
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.component').then((m) => m.SearchComponent),
    title: 'Search Players - statz',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

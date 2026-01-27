import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  private readonly router = inject(Router);

  searchQuery = signal('');
  mobileMenuOpen = signal(false);

  onSearchInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    const query = this.searchQuery().trim();
    if (query.length >= 2) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
      this.searchQuery.set('');
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}


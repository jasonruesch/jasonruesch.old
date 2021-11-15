import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkMode = false;
  darkModeChange = new BehaviorSubject<boolean>(this.darkMode);

  private media?: MediaQueryList;

  constructor(private mediaMatcher: MediaMatcher) {
    const storedPreference = this.getThemePreference();
    if (storedPreference) {
      this.darkMode = storedPreference === 'dark';
    } else {
      this.media = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)');
      this.media.addEventListener('change', this.handleColorScheme.bind(this));
      this.darkMode = this.media.matches;
    }
    this.darkModeChange.next(this.darkMode);
  }

  toggleDarkMode(): void {
    // TODO: Figure out why this isn't working
    this.media?.removeEventListener(
      'change',
      this.handleColorScheme.bind(this)
    );
    this.darkMode = !this.darkMode;
    localStorage.setItem('jr-theme', this.darkMode ? 'dark' : 'light');
    this.darkModeChange.next(this.darkMode);
  }

  private getThemePreference(): Theme | null {
    // Wrap localStorage access in try/catch because user agents can block localStorage. If it is
    // blocked, we treat it as if no preference was previously stored.
    try {
      return localStorage.getItem('jr-theme') as Theme;
    } catch {
      return null;
    }
  }

  private handleColorScheme(event: MediaQueryListEvent): void {
    this.darkMode = event.matches;
    this.darkModeChange.next(this.darkMode);
  }
}

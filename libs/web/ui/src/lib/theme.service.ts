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
    this.updateTheme(this.darkMode);
  }

  toggleDarkMode(): void {
    // TODO: Figure out why removing the event listener isn't working
    this.media?.removeEventListener(
      'change',
      this.handleColorScheme.bind(this)
    );
    this.darkMode = !this.darkMode;
    localStorage.setItem('jr-theme', this.darkMode ? 'dark' : 'light');
    this.updateTheme(this.darkMode);
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
    this.updateTheme(this.darkMode);
  }

  private updateTheme(darkMode: boolean): void {
    this.updateThemeStylesheet(darkMode);
    this.updateThemeColor(darkMode);
    this.darkModeChange.next(darkMode);
  }

  private updateThemeStylesheet(darkMode: boolean): void {
    const initialTheme = document.querySelector('#jr-initial-theme');
    if (initialTheme) {
      initialTheme.remove();
    }

    let themeLink = document.querySelector(
      '#jr-custom-theme'
    ) as HTMLLinkElement | null;
    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.id = 'jr-custom-theme';
      themeLink.rel = 'stylesheet';
      document.head.appendChild(themeLink);
    }
    themeLink.href = darkMode ? 'dark-theme.css' : 'light-theme.css';
  }

  private updateThemeColor(darkMode: boolean): void {
    const darkThemeColor = document.querySelector('#jr-dark-theme-color');
    if (darkThemeColor) {
      darkThemeColor.remove();
    }

    const themeColor = document.querySelector(
      '#jr-theme-color'
    ) as HTMLMetaElement;
    const primaryColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue(
      darkMode ? '--dark-primary-color' : '--light-primary-color'
    );
    themeColor.removeAttribute('media');
    // NOTE: light mode color isn't working when system is dark mode
    themeColor.content = primaryColor;
  }
}

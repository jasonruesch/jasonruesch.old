import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ThemeService } from '@jasonruesch/web/ui';
import { environment } from '@jasonruesch/shared/environment';

@Component({
  selector: 'jr-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  transparentToolbar = false;
  xsmall = false;

  private media!: MediaQueryList;
  private darkModeSubscription?: Subscription;

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private mediaMatcher: MediaMatcher,
    private changeDetector: ChangeDetectorRef
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.transparentToolbar = event.url === '/';

        if (this.transparentToolbar || this.xsmall) {
          this.sidenav.close();
        }
      });
  }

  ngOnInit(): void {
    this.media = this.mediaMatcher.matchMedia(Breakpoints.XSmall);
    this.media.addEventListener('change', this.handleBreakpoint.bind(this));
    this.xsmall = this.media.matches;

    this.darkModeSubscription = this.themeService.darkModeChange.subscribe(
      (darkMode: boolean) => this.updateTheme(darkMode)
    );
  }

  ngOnDestroy() {
    this.media.removeEventListener('change', this.handleBreakpoint.bind(this));
    this.darkModeSubscription?.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  setLanguage(localeId: string): void {
    const origin = document.location.origin;
    // Switching language is not allowed when developing locally.
    // To test a different language, change the `localize` value for the
    // `development` configuration in this project's `project.json` file.
    // TODO: Replace with shared environment variable
    if (!environment.production) {
      return;
    }
    document.location.href = `${origin}/${localeId}${this.router.url}`;
  }

  private handleBreakpoint(event: MediaQueryListEvent) {
    this.xsmall = event.matches;
    this.changeDetector.detectChanges();
  }

  private updateTheme(darkMode: boolean): void {
    this.updateThemeStylesheet(darkMode);
    this.updateThemeColor(darkMode);
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

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

  private media?: MediaQueryList;

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
  }

  ngOnDestroy() {
    this.media?.removeEventListener('change', this.handleBreakpoint.bind(this));
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
}

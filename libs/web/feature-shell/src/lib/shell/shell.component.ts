import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ThemeService } from '@jasonruesch/web/ui';
import { environment } from '@jasonruesch/shared/environment';
import { LayoutService } from '@jasonruesch/shared/utilities';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jr-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  transparentToolbar = false;

  private breakpointSubscription?: Subscription;

  constructor(
    public layoutService: LayoutService,
    public themeService: ThemeService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.transparentToolbar = event.url === '/';

        if (this.transparentToolbar || this.layoutService.xsmall) {
          this.sidenav.close();
        }
      });
  }

  ngOnInit(): void {
    this.breakpointSubscription = this.layoutService.breakpointChange.subscribe(
      () => this.changeDetector.detectChanges()
    );
  }

  ngOnDestroy(): void {
    this.breakpointSubscription?.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  getLanguageUrl(localeId: string): string {
    const origin = document.location.origin;
    // Switching language is not allowed when developing locally.
    // To test a different language, change the `localize` value for the
    // `development` configuration in this project's `project.json` file.
    if (!environment.production) {
      return this.router.url;
    }
    return `${origin}/${localeId}${this.router.url}`;
  }
}

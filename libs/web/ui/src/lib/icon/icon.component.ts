import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  Input,
  HostBinding,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'jr-icon',
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnInit, OnDestroy {
  @Input() solid = false;

  @HostBinding('class.jr-icon') className = true;

  primaryColor!: string;
  accentColor!: string;

  private darkModeSubscription?: Subscription;

  constructor(
    public themeService: ThemeService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.darkModeSubscription = this.themeService.darkModeChange.subscribe(
      (darkMode: boolean) => this.prepareColors(darkMode)
    );
  }

  ngOnDestroy() {
    this.darkModeSubscription?.unsubscribe();
  }

  private prepareColors(darkMode: boolean): void {
    this.primaryColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue(darkMode ? '--dark-text-color' : '--light-text-color');
    this.accentColor = this.solid
      ? this.primaryColor
      : getComputedStyle(document.documentElement).getPropertyValue(
          darkMode
            ? '--dark-primary-color-alternative'
            : '--light-primary-color-alternative'
        );
    this.changeDetector.detectChanges();
  }
}

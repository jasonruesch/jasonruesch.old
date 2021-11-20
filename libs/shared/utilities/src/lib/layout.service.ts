import { Injectable } from '@angular/core';
import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  small = false;
  xsmall = false;
  breakpointChange = new ReplaySubject<void>(1);

  private smallMedia?: MediaQueryList;
  private xsmallMedia?: MediaQueryList;

  constructor(private mediaMatcher: MediaMatcher) {
    this.smallMedia = this.mediaMatcher.matchMedia(Breakpoints.Small);
    this.smallMedia.addEventListener(
      'change',
      this.handleSmallBreakpoint.bind(this)
    );
    this.small = this.smallMedia.matches;
    this.xsmallMedia = this.mediaMatcher.matchMedia(Breakpoints.XSmall);
    this.xsmallMedia.addEventListener(
      'change',
      this.handleXSmallBreakpoint.bind(this)
    );
    this.xsmall = this.xsmallMedia.matches;
  }

  private handleSmallBreakpoint(event: MediaQueryListEvent) {
    this.small = event.matches;
    this.breakpointChange.next();
  }

  private handleXSmallBreakpoint(event: MediaQueryListEvent) {
    this.xsmall = event.matches;
    this.breakpointChange.next();
  }
}

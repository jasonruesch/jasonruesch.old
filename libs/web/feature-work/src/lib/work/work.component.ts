import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { LayoutService } from '@jasonruesch/shared/utilities';
import { Subscription } from 'rxjs';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'jr-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent implements OnInit, OnDestroy {
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  private breakpointSubscription?: Subscription;

  constructor(
    public layoutService: LayoutService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breakpointSubscription = this.layoutService.breakpointChange.subscribe(
      () => this.changeDetector.detectChanges()
    );
  }

  ngOnDestroy(): void {
    this.breakpointSubscription?.unsubscribe();
  }
}

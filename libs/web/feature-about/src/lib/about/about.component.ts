import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'jr-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  yearsOfExperience = new Date().getFullYear() - 2004; // 2004 was the year I started learning software development!
}

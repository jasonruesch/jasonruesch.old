import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { WebUiModule } from '@jasonruesch/web/ui';
import {
  CustomIconRegistry,
  svgIconProviders,
} from '@jasonruesch/shared/utilities';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import('@jasonruesch/web/feature-home').then(
                (m) => m.WebFeatureHomeModule
              ),
          },
          {
            path: 'about',
            loadChildren: () =>
              import('@jasonruesch/web/feature-about').then(
                (m) => m.WebFeatureAboutModule
              ),
          },
          {
            path: 'work',
            loadChildren: () =>
              import('@jasonruesch/web/feature-work').then(
                (m) => m.WebFeatureWorkModule
              ),
          },
          {
            path: 'contact',
            loadChildren: () =>
              import('@jasonruesch/web/feature-contact').then(
                (m) => m.WebFeatureContactModule
              ),
          },
        ],
      },
    ]),
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    WebUiModule,
  ],
  declarations: [ShellComponent],
  providers: [
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: false,
    },
    svgIconProviders,
    { provide: MatIconRegistry, useClass: CustomIconRegistry },
  ],
  exports: [ShellComponent],
})
export class WebFeatureShellModule {}

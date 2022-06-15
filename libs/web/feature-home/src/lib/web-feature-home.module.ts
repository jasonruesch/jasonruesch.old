import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WebUiModule } from '@jasonruesch/web/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeComponent },
    ]),
    WebUiModule,
  ],
  declarations: [HomeComponent],
})
export class WebFeatureHomeModule {}

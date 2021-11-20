import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkComponent } from './work/work.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WorkComponent },
    ]),
    MatGridListModule,
  ],
  declarations: [WorkComponent],
})
export class WebFeatureWorkModule {}

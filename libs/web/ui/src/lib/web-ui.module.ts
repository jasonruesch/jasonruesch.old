import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LogoComponent, IconComponent],
  exports: [LogoComponent, IconComponent],
})
export class WebUiModule {}

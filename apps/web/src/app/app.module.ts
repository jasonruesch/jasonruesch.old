import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebFeatureShellModule } from '@jasonruesch/web/feature-shell';
import { RouterModule } from '@angular/router';
import { SharedConfigModule } from '@jasonruesch/shared/config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    WebFeatureShellModule,
    SharedConfigModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

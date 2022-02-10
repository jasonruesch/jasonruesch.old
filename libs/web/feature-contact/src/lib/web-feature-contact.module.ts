import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ContactService } from './contact/contact.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import {
  CustomIconRegistry,
  svgIconProviders,
} from '@jasonruesch/shared/utilities';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '@jasonruesch/shared/environment';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ContactComponent },
    ]),
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    RecaptchaV3Module,
  ],
  declarations: [ContactComponent],
  providers: [
    ContactService,
    svgIconProviders,
    { provide: MatIconRegistry, useClass: CustomIconRegistry },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ],
})
export class WebFeatureContactModule {}

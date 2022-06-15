import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { ContactService } from './contact.service';
import { NavigationEnd, Router } from '@angular/router';
import '@angular/localize/init';

@Component({
  selector: 'jr-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });
  sending = false;

  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.snackBar.dismiss();
      });
  }

  onSubmit(event: Event): void {
    this.sending = true;

    this.send()
      .pipe(
        switchMap(() => this.sendConfirmation()),
        catchError(() => {
          this.sending = false;
          this.changeDetector.detectChanges();
          this.showWarningSnackBar(
            $localize`Your message could not be delivered. Please try again.`
          );
          return EMPTY;
        })
      )
      .subscribe(() => {
        (event.target as HTMLFormElement).reset();
        this.sending = false;
        this.changeDetector.detectChanges();
        this.showSuccessSnackBar($localize`Thank you for contacting me!`);
      });
  }

  private send(): Observable<unknown> {
    return this.contactService.send(
      this.contactForm.value.name,
      this.contactForm.value.email,
      this.contactForm.value.message
    );
  }

  private sendConfirmation(): Observable<unknown> {
    return this.contactService.sendConfirmation(
      this.contactForm.value.name,
      this.contactForm.value.email
    );
  }

  private showSuccessSnackBar(message: string) {
    this.snackBar.open(message, $localize`Close`, {
      panelClass: 'success',
    });
  }

  private showWarningSnackBar(message: string) {
    this.snackBar.open(message, $localize`Close`, {
      panelClass: 'warn',
    });
  }
}

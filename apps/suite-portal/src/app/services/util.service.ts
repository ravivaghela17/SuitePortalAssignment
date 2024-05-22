import { Injectable } from '@angular/core';

import { ERROR_MESSAGES, SnackBarconfig } from '../constants';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private readonly snackBar: MatSnackBar) {}
  getRequiredFieldMessage(errors: any): string {
    return errors?.required ? ERROR_MESSAGES.REQUIRED_FIELD : '';
  }
  getEmailErrorMessage(errors: any): string {
    return errors.required
      ? ERROR_MESSAGES.REQUIRED_FIELD
      : errors.pattern
      ? ERROR_MESSAGES.EMAIL_PATTERN
      : '';
  }
  openSnackBar(snackBarType: string, message: string) {
    const config = {
      ...SnackBarconfig,
      panelClass: snackBarType,
    } as MatSnackBarConfig;
    this.snackBar.open(message, '', config);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, Response } from '@suiteportal/api-interfaces';
import { ValidationError } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
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
}

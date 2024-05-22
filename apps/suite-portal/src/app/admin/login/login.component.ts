import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '../../services/auth-api.service';
import {
  REGEX_EMAIL_PATTERN,
  ERROR_MESSAGES,
  SNACK_BAR_TYPES,
} from '../../constants';
import { UtilService } from '../../services/util.service';
import { User } from '@suiteportal/api-interfaces';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authApiService: AuthApiService,
    private readonly utilService: UtilService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  login() {
    if (!this.form.valid) {
      return;
    }
    const user: User = {
      email: this.email.value,
      password: this.password.value,
    };
    this.authApiService
      .login(user)
      .pipe(
        tap((response) => {
          if (response?.data) {
            this.router.navigate([`/requests`]);
          }
        }),
        catchError((error) => {
          const errorMessage = error?.message
            ? error.message
            : ERROR_MESSAGES.REQUEST_FAILURE;
          this.utilService.openSnackBar(SNACK_BAR_TYPES.ERROR, errorMessage);
          return error;
        })
      )
      .subscribe();
  }
  get password(): AbstractControl {
    return this.form.get('password');
  }
  get email(): AbstractControl {
    return this.form.get('email');
  }
  getEmailErrorMessage(): string {
    const errors = this.email.errors;
    return this.utilService.getEmailErrorMessage(errors);
  }
  getPasswordErrorMessage(): string {
    const errors = this.password.errors;
    return this.utilService.getRequiredFieldMessage(errors);
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(REGEX_EMAIL_PATTERN)],
      ],
      password: ['', [Validators.required]],
    });
  }
}

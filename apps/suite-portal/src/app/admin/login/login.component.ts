import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '../../services/auth-api.service';
import { REGEX_EMAIL_PATTERN, ERROR_MESSAGES } from '../../constants';
import { UtilService } from '../../services/util.service';

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
    private readonly authApiService: AuthApiService,
    private readonly utilService: UtilService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  login() {
    this.authApiService.login(this.form.value).subscribe();
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

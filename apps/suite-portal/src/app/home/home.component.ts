import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  AbstractControl,
} from '@angular/forms';
const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  EMAIL_PATTERN: 'Please enter a valid email address',
};
@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;
  form: FormGroup;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }
  get unitNumber(): AbstractControl {
    return this.form.get('unitNumber');
  }
  get requesterName(): AbstractControl {
    return this.form.get('requesterName');
  }
  get requesterEmail(): AbstractControl {
    return this.form.get('requesterEmail');
  }
  get serviceType(): AbstractControl {
    return this.form.get('serviceType');
  }
  get summary(): AbstractControl {
    return this.form.get('summary');
  }
  getRequiredFieldMessage(field: string): string {
    const errors = this.form.get(field).errors;
    return errors.required ? ERROR_MESSAGES.REQUIRED_FIELD : '';
  }
  getEmailErrorMessage(): string {
    const errors = this.requesterEmail.errors;
    return errors.required
      ? ERROR_MESSAGES.REQUIRED_FIELD
      : errors.pattern
      ? ERROR_MESSAGES.EMAIL_PATTERN
      : '';
  }
  private createForm(): FormGroup {
    const form = this.fb.group({
      unitNumber: ['', [Validators.required]],
      requesterName: ['', [Validators.required]],
      requesterEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+$'),
        ],
      ],
      serviceType: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      details: [''],
    });
    return form;
  }
}

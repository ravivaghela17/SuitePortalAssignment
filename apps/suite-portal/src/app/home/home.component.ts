import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ALL_SERVICE_TYPES,
  MaintenanceRequest,
} from '@suiteportal/api-interfaces';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  AbstractControl,
  NgForm,
} from '@angular/forms';
import { MaintenanceRequestApiService } from '../services/maintenance-api.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarconfig, SNACK_BAR_TYPES } from '../constants';
import { tap, first, catchError, finalize } from 'rxjs/operators';

const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  EMAIL_PATTERN: 'Please enter a valid email address',
  REQUEST_FAILURE: 'Unable to proceed the request, Please try again',
};
const REQUEST_SUCCECSS = 'Request submitted successfully!';
@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;
  form: FormGroup;

  @ViewChild('ngForm')
  ngForm: NgForm;
  constructor(
    private readonly fb: FormBuilder,
    private readonly maintenanceRequestService: MaintenanceRequestApiService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  submitRequest() {
    if (!this.form.valid) {
      this.openSnackBar(SNACK_BAR_TYPES.ERROR, ERROR_MESSAGES.REQUEST_FAILURE);
      return;
    }
    const saveModel = this.prepareMaintainceModel(this.form.value);

    this.maintenanceRequestService
      .createMaintenanceRequest(saveModel)
      .pipe(
        first(),
        tap((response) => {
          if (response) {
            this.openSnackBar(SNACK_BAR_TYPES.SUCCESS, REQUEST_SUCCECSS);
          }
        }),
        catchError((error) => {
          const errorMessage = error?.message
            ? error.message
            : ERROR_MESSAGES.REQUEST_FAILURE;
          this.openSnackBar(SNACK_BAR_TYPES.ERROR, errorMessage);
          return error;
        }),
        finalize(() => {
          this.resetForm();
        })
      )
      .subscribe();
  }
  resetForm() {
    this.form.reset();
    // setting the error as null since reset function will add the initial validation
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key).setErrors(null);
    });
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
  private prepareMaintainceModel(formValues): MaintenanceRequest {
    const saveModel: MaintenanceRequest = {
      name: formValues.requesterName ?? '',
      email: formValues.requesterEmail ?? '',
      unitNumber: formValues.unitNumber ?? '',
      serviceType: formValues.serviceType ?? '',
      summary: formValues.summary ?? '',
      details: formValues.details ?? '',
    };
    Object.keys(saveModel).forEach((key) => {
      if (['', null, undefined].includes(saveModel[key])) {
        delete saveModel[key];
      }
    });
    return saveModel;
  }
  private createForm(): void {
    this.form = this.fb.group({
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
  }
  openSnackBar(snackBarType: string, message: string) {
    const config = {
      ...SnackBarconfig,
      panelClass: snackBarType,
    } as MatSnackBarConfig;
    this.snackBar.open(message, '', config);
  }
}

import { Component, OnInit } from '@angular/core';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;
  form: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    //
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

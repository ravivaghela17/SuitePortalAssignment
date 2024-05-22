import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../../services/auth-api.service';
@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly authApiService: AuthApiService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  login() {
    this.authApiService.login(this.form.value).subscribe();
  }
  private createForm(): void {
    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared.module';
import { RequestListComponent } from './request-list/request-list.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [LoginComponent, RequestListComponent],
  exports: [LoginComponent, RequestListComponent],
})
export class AdminModule {}

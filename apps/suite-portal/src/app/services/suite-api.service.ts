import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
interface Response {
  status: number;
  code: number;
  message: string;
  userId: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class SuiteApiService {
  constructor(private readonly http: HttpClient) {}
  createMaintenanceRequest(body: MaintenanceRequest): Observable<Response> {
    return this.http.post<Response>('/api/maintenance-requests', body);
  }
}

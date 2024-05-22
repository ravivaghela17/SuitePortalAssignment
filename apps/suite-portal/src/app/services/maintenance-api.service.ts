import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MaintenanceRequest, Response } from '@suiteportal/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestApiService {
  constructor(private readonly http: HttpClient) {}
  createMaintenanceRequest(body: MaintenanceRequest): Observable<Response> {
    return this.http.post<Response>('/api/maintenance-requests', body);
  }
}

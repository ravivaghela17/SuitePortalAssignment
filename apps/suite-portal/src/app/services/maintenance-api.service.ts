import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MaintenanceRequest, Response } from '@suiteportal/api-interfaces';

const MAINTENANCE_REQUEST = '/api/maintenance-requests';
const PATH_MAINTENACE_REQUEST_CLOSE =
  MAINTENANCE_REQUEST + '/{requestId}/close';
@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestApiService {
  constructor(private readonly http: HttpClient) {}
  createMaintenanceRequest(body: MaintenanceRequest): Observable<Response> {
    return this.http.post<Response>(MAINTENANCE_REQUEST, body);
  }
  getOpenMaintenanceRequest(): Observable<Response> {
    return this.http.get<Response>(MAINTENANCE_REQUEST, {});
  }
  closeMaintenanceRequest(id: string): Observable<Response> {
    const url = PATH_MAINTENACE_REQUEST_CLOSE.replace('{requestId}', id);
    return this.http.put<Response>(url, {});
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, Response } from '@suiteportal/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly http: HttpClient) {}
  login(body: User): Observable<Response> {
    return this.http.post<Response>('/api/admin/login', body);
  }
}

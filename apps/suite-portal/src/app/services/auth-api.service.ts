import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, Response } from '@suiteportal/api-interfaces';
import { tap } from 'rxjs/operators';

class Storage {
  key: string;
  object: any;
  constructor(key: string, object: any) {
    this.key = key;
    this.object = object;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly http: HttpClient) {}
  login(body: User): Observable<Response> {
    return this.http.post<Response>('/api/admin/login', body).pipe(
      tap((response) => {
        if (response.data) {
          //clearing existing session
          sessionStorage.clear();
          const storage = new Storage('ADMIN', response.data);
          sessionStorage.setItem('ADMIN', JSON.stringify(storage));
        }
      })
    );
  }
}

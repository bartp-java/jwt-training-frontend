import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import {environment} from "../../environments/environment";

export interface AuthResponseData {
  idToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        environment.HOST_URL + environment.AUTHENTICATION_URL,
        {
          email: email,
          password: password,
          role: 'regular'
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            email,
            password,
            resData.idToken
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate([environment.AUTHENTICATION_URL]);
    localStorage.removeItem('userData');
  }

  private handleAuthentication (
    email: string,
    password: string,
    token: string
  ) {

    const user = new User(email, password, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes.error.message);
  }
}

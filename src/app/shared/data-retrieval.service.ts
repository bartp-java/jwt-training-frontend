import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Process} from "../process/process.model";
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class DataRetrievalService {

  constructor (private http: HttpClient) {}

  fetchProcesses() {
    return this.http
      .get<Process[]>(
        environment.HOST_URL + environment.ALL_PROCESSES_URL,
      ).pipe(
        catchError(this.handleError)
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes.error.message);
  }
}

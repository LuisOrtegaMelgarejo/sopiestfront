import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ReporteCertificado } from './certificate';


@Injectable({ providedIn: 'root' })
export class CertificateService {

  private heroesUrl = 'api/ms/sopiest'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getReport(): Observable<ReporteCertificado[]> {
    return this.http.get<ReporteCertificado[]>(`${this.heroesUrl}/certificate/list`)
      .pipe(
        catchError(this.handleError<ReporteCertificado[]>('getReport', []))
      );
  }

  createCertificate(body: any, password: string): Observable<string> {
    const requestOptions: Object = {
      headers: new HttpHeaders().append('x-user-data', password),
      responseType: 'text'
    }

    return this.http.post<string>(`${this.heroesUrl}/certificate/make`, body, requestOptions)
      .pipe(
        catchError(this.handleError<string>('createCertificate', '{"error":true,"url":"Fallo la creacion"}'))
      );
  }

  uploadConfig(body: any, password: string) {
    const requestOptions: Object = {
      headers: new HttpHeaders().append('x-user-data', password),
      responseType: 'text'
    }

    return this.http.post<any>(`${this.heroesUrl}/config`, body, requestOptions)
      .pipe(
        map((response) => !response.error ? 'Se subio con exito': 'Fallo la subida'),
        catchError(this.handleError<string>('uploadConfig', 'Fallo la subida'))
      );
  }

  getConfig(type: number) {
    return this.http.get<any>(`${this.heroesUrl}/config/${type}`)
    .pipe(
      catchError(this.handleError<any>('delete', { error: true }))
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.heroesUrl}/certificate/${id}`)
    .pipe(
      catchError(this.handleError<any>('delete', { error: true }))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}

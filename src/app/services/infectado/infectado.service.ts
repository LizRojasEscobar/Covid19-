import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InfectadoService {
  environmentUrl: string = "";
  constructor(private http: HttpClient) {
    this.environmentUrl = environment.apiUrl + "/api/infectado/new";
  }

  agregarInfectado(jsonBody: any): Observable<any> {
    let headers = { 'content-Type': 'application/json' }
    return this.http.post(this.environmentUrl, jsonBody, { headers });
  }
}

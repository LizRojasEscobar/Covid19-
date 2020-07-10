import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TriajeService {
  environmentUrl: string = "";
  constructor(private http: HttpClient) {
    this.environmentUrl = environment.apiUrl + "/api/triaje/new";
  }

  addTriaje(bodyJson: any): Observable<any> {
    let headers = { 'content-Type': 'application/json' }
    return this.http.post<any>(this.environmentUrl, bodyJson, { headers });
  }
}

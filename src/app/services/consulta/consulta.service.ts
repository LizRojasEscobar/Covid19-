import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  environmentUrl: string = "";
  constructor(private http: HttpClient) {
    this.environmentUrl = environment.apiUrl + "/api/consultar?fecha=";
  }

  consultar(fecha: string): Observable<any> {
    return this.http.get(this.environmentUrl + fecha);
  }
}

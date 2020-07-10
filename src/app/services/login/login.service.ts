import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  environmentUrl:string = "";
  constructor(private http: HttpClient) {
    this.environmentUrl = environment.apiUrl;
  }

  selUser(usuario: string, contrasena: string): Observable<any> {
    return this.http.get<any>(this.environmentUrl + "/api/login?usuario=" + usuario + "&contrasena=" + contrasena);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class GlobalService {

  //public url: any = "http://127.0.0.1:8080/PHPhumberto/";
  public url: any = "https://santiagolo902-lab4.000webhostapp.com/PHPhumberto/";
  
  constructor(protected http : HttpClient, protected helper : JwtHelperService) { }

  public post<T>(api : string, body : any) {
    return this.http.post<T>(this.url + api, body);
  }

  public get<T>(api : string) {
    return this.http.get<T>(this.url + api);
  }
}
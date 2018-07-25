import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { GlobalService } from '../servicios/global.service'

@Injectable()
export class EncuestasService {

  private token: string;


  constructor(public http: HttpClient, 
              public helper: JwtHelperService, 
              public router: Router,
              public global: GlobalService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
  }

  public post<T>(api: string, body: any) {
    return this.http.post<T>(this.global.url + api, body);
  }

  public get<T>(api: string) {
    return this.http.get<T>(this.global.url + api);
  }

  public traerTodos() {
    return this.get<Array<any>>('encuesta/').toPromise();
  }

  public finalizarEncuesta(datos:any) : Promise<any> {
    return this.post<any>('encuesta/finalizar/', datos).toPromise();
  }

}

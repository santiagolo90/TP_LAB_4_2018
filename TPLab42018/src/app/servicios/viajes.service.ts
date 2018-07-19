import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { GlobalService } from '../servicios/global.service'

@Injectable()
export class ViajesService {

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


  public registarViaje(datos:any) : Promise<any> {
    return this.post<any>('viaje/alta/', datos).toPromise();
  }

  public traerTodos() {
    return this.get<Array<any>>('viaje/').toPromise();
  }

  public traerPorCliente(datos:any) : Promise<any> {
    return this.post<any>('viaje/porCliente/', datos).toPromise();
  }
  public traerPorChofer(datos:any) : Promise<any> {
    return this.post<any>('viaje/porChofer/', datos).toPromise();
  }

  public tomarViaje(datos:any) : Promise<any> {
    return this.post<any>('viaje/tomarViaje/', datos).toPromise();
  }



}


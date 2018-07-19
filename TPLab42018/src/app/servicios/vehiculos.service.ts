import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { GlobalService } from '../servicios/global.service'

@Injectable()
export class VehiculosService {

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

  public registrarVehiculo(datos:any) : Promise<any> {
    return this.post<any>('vehiculos/alta', datos).toPromise();
  }
  public traerTodosVehiculos() {
    return this.get<Array<any>>('vehiculos/').toPromise();
  }
  public traerTodosVehiculosDisponibles() {
    return this.get<Array<any>>('vehiculos/disponibles/').toPromise();
  }

  public activarSuspenderChofer(accion:string, datos:any) : Promise<any> {
    return this.post<any>(accion, datos).toPromise();
  }

  public cambiarEstado(datos:any) : Promise<any> {
    return this.post<any>("vehiculos/cambiarEstado/", datos).toPromise();
  }

  public traerUno( datos:any) : Promise<any> {
    return this.post<any>("vehiculos/traerUno/", datos).toPromise();
  }

}



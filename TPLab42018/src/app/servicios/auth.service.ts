import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { GlobalService } from '../servicios/global.service'

@Injectable()
export class AuthService {
  //private url: any = "http://127.0.0.1:8080/PHPhumberto/";
  private url: any = "https://santiagolo902-lab4.000webhostapp.com/PHPhumberto/";
  private token: string;


  constructor(public http: HttpClient, public helper: JwtHelperService, public router: Router) {
    //super(http, helper);

    this.token = localStorage.getItem('token');
    //this.getData();
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
  }

  public post<T>(api: string, body: any) {
    return this.http.post<T>(this.url + api, body);
  }

  public get<T>(api: string) {
    return this.http.get<T>(this.url + api);
  }


  public login(datos: any): Promise<any> {
    return this.post<any>('Login', datos).toPromise().then(res => {
      if (res == "Falta email y clave" || res == "Error en email o clave" || res == "Usuario Suspendido") {
        console.log("no res: ", res);
        return res;
      } else {
        this.token = res.Token;
        localStorage.setItem('token', res.Token);
        console.log("token res: ", res);
        return res;
      }
    });
  }
  public registrarUsuario(datos:any) : Promise<any> {
    return this.post<any>('empleado/alta', datos).toPromise();
  }

  public traerTodos() {
    return this.get<Array<any>>('empleado/').toPromise();
  }
  public traerSuspendidos() {
    return this.get<Array<any>>('empleado/suspendidos').toPromise();
  }
  public pedidoGet(api:string) {
    return this.get<Array<any>>(api).toPromise();
  }

  public logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  public getData(): void {
    let info = this.helper.decodeToken(this.token);
    if (info) {
      //this.data = info.data as AuthData;
      console.log("token: ", this.token);
      console.log(info.data.tipo);
      return info.data;
    }
  }

  // public sosAdmin(miToken: string) {
  //   let info = this.helper.decodeToken(miToken);
  //   if (info) {
  //     console.log("sos ", info.data.tipo);
  //     if (info.data.tipo === "admin") {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  public sosAdmin() : boolean {
    let miToken = this.helper.decodeToken(this.token);
     if (miToken.data.tipo === "admin") {
       //console.log("sos ", miToken.data.tipo);
       return true;
     }else{
       return false;
     }
  }
  public sosEncargado() : boolean {
    let miToken = this.helper.decodeToken(this.token);
     if (miToken.data.tipo === "encargado") {
       console.log("sos ", miToken.data.tipo);
       return true;
     }else{
       return false;
     }
  }
  public sosChofer() : boolean {
    let miToken = this.helper.decodeToken(this.token);
     if (miToken.data.tipo === "chofer") {
       console.log("sos ", miToken.data.tipo);
       return true;
     }else{
       return false;
     }
  }
  public sosCliente() : boolean {
    let miToken = this.helper.decodeToken(this.token);
     if (miToken.data.tipo === "cliente") {
       console.log("sos ", miToken.data.tipo);
       return true;
     }else{
       return false;
     }
  }

  public sosActivo(miToken: string) {
    let info = this.helper.decodeToken(miToken);
    if (info) {
      console.log("tu estado es: ", info.data.estado);
      if (info.data.estado === "activo") {
        return true;
      }
    }
    return false;
  }

  public estasLogueado() : boolean {
    //let miToken = localStorage.getItem('token');
    let miToken: string;
    if (this.token == undefined) {
      if (localStorage.getItem('token') != null) {
        console.log("local: ", localStorage.getItem('token'));
        miToken = localStorage.getItem('token')
      }else{
        console.log("acceso denegado");
        return false;
      }      
    }else{
      console.log("token solo: ", this.token);
      miToken= this.token;
    }
    console.log("miToken: ",miToken);
    return miToken != null && !this.helper.isTokenExpired(miToken);
    //return !this.helper.isTokenExpired(miToken);
  }


}

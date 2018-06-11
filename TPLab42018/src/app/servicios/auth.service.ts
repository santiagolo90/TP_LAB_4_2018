/* MIO
 import { Injectable } from '@angular/core';
 import { Http, Response, RequestOptions, Headers } from '@angular/http';
 import { Observable } from 'rxjs/Observable';
 import 'rxjs/add/operator/catch';
 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/toPromise';
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private url:any="http://127.0.0.1:8080/PHPhumberto/";
  private url2:any="https://santiagolo902-lab4.000webhostapp.com/PHPhumberto/";
  //headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  //headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  // constructor(public http: Http) { }

    // public login(que,objeto) {
    // return this.http.post(this.url + que, objeto).map(res => res.json());
    // }
    private token : string;

    constructor(public http : HttpClient, public helper : JwtHelperService, public router : Router) {
      //super(http, helper);
      this.token = localStorage.getItem('token');
      //this.getData();
    }

    public registrarUsuario(datos) : Promise<any> {
      return this.http.post<any>(this.url+'empleado/alta', datos).toPromise().then(res => {
          console.log("respuesta registar: ", res);
          //return res;
      });
    }

    public login(datos) : Promise<any> {
      return this.http.post<any>(this.url+'Login', datos).toPromise().then(res => {
        
        if (res !="Falta email y clave" && res != "Error en email o clave" ) {
          this.token = res.Token;
          console.log("token:", this.token);
          localStorage.setItem('Token', res.Token);
        }else{
          console.log("res:", res);
        }
        //this.getData();
        return res;
      });
    }

    public getData() : void {
      let info = this.helper.decodeToken(this.token);
      if(info) {
        //this.data = info.data as AuthData;
        console.log("token: ",this.token);
        console.log(info.data.tipo);
        return info.data;
      }
    }

    public sosAdmin(miToken:string) {
      let info = this.helper.decodeToken(miToken);
      if(info) {
        console.log("sos admin",info.data.tipo);
        if (info.data.tipo === "admin") {
          return true;
        }
        
      }
      return false;
    }


}

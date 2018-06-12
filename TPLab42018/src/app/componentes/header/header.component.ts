import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from '../../servicios/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() enviarDato:EventEmitter<any>=new EventEmitter<any>(); // nuevo - delegate
  //dato:string;
  constructor(public miHttp: AuthService) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this.miHttp.logout();
  }
  mostar(){
    console.log("estoy en header mostrando");
    //this.dato = "si";
    this.enviarDato.emit("si");
  }
  ocultar(){
    console.log("estoy en header ocultado");
    //this.dato = "no";
    this.enviarDato.emit("no");
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {
  @Input() dato: any[];
  mostrarIF:string;
  public listadoDeUsuarios: Array<any>;
  public listadoDeClientes: Array<any>;
  mostrarClientes:boolean = true;
  mensajeClientes:string;
  mostrarEmpleados:boolean = true;
  mensajeEmpleado:string;

  constructor(public miHttp: AuthService,
    public http: Http,
    private router: Router,
    public miElementRef:ElementRef) {
  }

  ngOnInit() {
    this.listar();
    this.listarClientes();
  }
  Enviar(dato:any){
    console.log("Estoy en enviar: ",dato);
    console.log(dato);
    // this.encontro = true;
    // this.datoEncontrado = dato;
    // console.log(this.datoEncontrado);
   this.mostrarIF = dato;
   console.log("this.mostrarIF: ",this.mostrarIF)
  }


  public listar():Promise<Array<any>> {
    return   this.miHttp.pedidoGet("empleado/empleados/").then( data => {
         this.mostrarEmpleados = true;
         console.log( "volvio de get / trae empleados: " );
         console.log(  data );
         this.listadoDeUsuarios=data;
       })
       .catch( err => {
        this.mensajeEmpleado = err.error;
        this.mostrarEmpleados = false;
         console.log( err );
         return null;
       });
 }
 listarClientes(){
  return   this.miHttp.pedidoGet("empleado/clientes/").then( data => {
    this.mostrarClientes = true;
    console.log( "volvio de get / trae clientes: " );
    console.log(  data );
    this.listadoDeClientes=data;
  })
  .catch( err => {
    this.mensajeClientes = err.error;
    this.mostrarClientes = false;
    console.log( err );
    return null;
  });

 }

}

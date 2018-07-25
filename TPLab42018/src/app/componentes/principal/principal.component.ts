import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { UsuarioService } from '../../servicios/usuario.service'
import { EncuestasService } from '../../servicios/encuestas.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {
  @Input() dato: any[];
  mostrarIF:string;
  usuario:any;



  constructor(public miHttp: AuthService,
              public miHttpUsuario: UsuarioService,
              private toastr: ToastrService,
              public http: Http,
              private router: Router,
              private encuestasService:EncuestasService,
              public miElementRef:ElementRef) {
  }

  ngOnInit() {
    this.usuario = this.miHttp.getDataNombre();
    
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







 mostarToast(titulo:string,mensaje:string,tipo:string) {
  //ToastrService.success/error/warning/info/show()
  if (tipo =="success") {
    this.toastr.success(mensaje,titulo);
  }
  if (tipo =="error") {
    this.toastr.error(mensaje,titulo);
  }
  if (tipo =="warning") {
    this.toastr.warning(mensaje,titulo);
  }
  if (tipo =="info") {
    this.toastr.info(mensaje,titulo);
  }
  if (tipo =="show") {
    this.toastr.show(mensaje,titulo);
  }
  
}

}

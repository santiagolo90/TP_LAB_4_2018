import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from '../../servicios/auth.service'
import { Http, Headers,Response,RequestOptions } from '@angular/http';

//import * as $ from ‘jquery’;
// declare var jQuery:any;
// declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioRegistro:string;
  claveRegistro:string;
  claveRegistro2:string;
  nombreRegistro:string;
  tipoRegistro:string;
  items = ['admin', 'encargado', 'cliente','chofer'];

  progreso: number;
  progresoMensaje="esperando..."; 
  logeando:boolean =false;
  ProgresoDeAncho:string;
  Mensajes:string;
  spiner:boolean= false;
  spinerRegistro:boolean =false;

  clave:string;
  email:string;
  token:string;

  constructor(public miHttp: AuthService,
              public builder: FormBuilder,
              public http: Http,
              private router : Router ) {
   }

  ngOnInit() {
  }
/*
  // email = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(5)
  // ]);
  
  // clave = new FormControl('', [
  //   Validators.required
  // ]);
  
  
  
  
  
  // registroForm: FormGroup = this.builder.group({
  //   email: this.email,
  //   clave: this.clave,
  
  // });
  // enviarLogin(){
  //   let usuario = {'email':this.email,
  //                  'clave':this.clave}
                  
                  
  // console.log("Form: "+usuario);
  //   this.miHttp.login(usuario).subscribe((response) => {
  //     //alert("se guardo correctamente "+response);
  //     console.log("response: "+ JSON.stringify(response));
  //     //return this.listar();
    
  //   }, (error) => {
  //     console.log("error", error);
  //   });
   

  // }
*/  
  enviarLogin2() {
    let usuario = {'email':this.email,
                  'clave':this.clave}
    this.miHttp.login(usuario).then(res => {
      this.router.navigate(['/principal']);
      //console.log("response: ", res);
      //this.token = res.Token;
      
    }).catch(err => {
      console.log("Error",err);
    });
  }

  enviarLogin(){
    if(this.email == null || this.clave == null || this.clave == '' || this.email == '')
    {
      return this.MostarMensaje("Debe completar los campos",false,'msjLogin');
    }
    let usuario = {'email':this.email,
    'clave':this.clave}

    this.spiner= true;
    this.miHttp.login(usuario).then(res => {
      this.router.navigate(['/principal']);
      //console.log("response: ", res);
      //this.token = res.Token;
      this.MostarMensaje("Bienvenido "+this.email,true,'msjLogin')
      this.spiner= false;
    }).catch(err => {
      this.spiner= false;
      console.log("Error",err);
    });


  }

  Registrar(){
    if(this.claveRegistro != null && this.claveRegistro.length > 5){

      if(this.usuarioRegistro != null && this.usuarioRegistro != ""){
        this.spiner= true;
        if (this.claveRegistro == this.claveRegistro2){
          this.spinerRegistro= true;
          let usuario = {'nombre':this.nombreRegistro,
                        'email':this.usuarioRegistro,
                        'clave':this.claveRegistro,
                        'tipo':this.tipoRegistro,
                        'estado': "activo"}

          this.miHttp.registrarUsuario(usuario).then(res => {
            this.MostarMensaje("Bienvenido "+this.email,true,'msjLogin')
            this.spinerRegistro= false;
            console.log("volvi de registar:"+ JSON.parse(res));
            
          }).catch(err => {
            this.spinerRegistro= false;
            console.log("Error",err);
            return this.MostarMensaje(err.error,false,'msjRegistro');
          });
        }else{
          return this.MostarMensaje("Las clave no coinciden",false,'msjRegistro');
        }
      }else{
        return this.MostarMensaje("Debe ingresar un correo",false,'msjRegistro');
      }
    }else{
        return this.MostarMensaje("Contraseña no debe ser menor a 6 caracteres",false,'msjRegistro');
      }
  }

 
  spinerLogin(){
    
    setTimeout(function(){ 
      // errorEmail.className = errorEmail.className.replace("show", "");
      this.logeando=false;
      this.Entrar()
     }, 3000);
  }

  // cargando() {
  //   let loader = this.loadingCtrl.create({
  //     content: "Cargando...",
  //     duration: 3000
  //   });
  //   return loader;
  // }

  // Entrar(){
    
  //   if (this.usuario === 'admin' && this.clave === 'admin') {
  //     this.MostarMensaje("Bienvendio!!!"+ this.usuario,true);
  //     this.router.navigate(['/Principal']);
  //   }
  //   else{
  //     this.MostarMensaje("Error en usuario o contraseña",false);
       
  //   }
  // }

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false,tipo:string) {
    this.Mensajes=mensaje;    
    let errorEmail = document.getElementById(tipo);
    if(ganador)
      {
        errorEmail.innerHTML = (`<h4 id='${tipo}'><kbd class= label-success>${mensaje} <i class="far fa-smile"></i> </kbd></h4>`);
      }else{
        errorEmail.innerHTML = (`<h4 id='${tipo}'><kbd class= label-danger>${mensaje} <i class="far fa-frown"></i></kbd></h4>`);
      }
    var modelo=this;
    setTimeout(function(){ 
      // errorEmail.className = errorEmail.className.replace("show", "");
      errorEmail.innerHTML = "";
     }, 3000);
    console.info("objeto",errorEmail);
  
   } 

}

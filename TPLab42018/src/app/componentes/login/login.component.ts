import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//import * as $ from ‘jquery’;
// declare var jQuery:any;
// declare var $:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioRegistro: string;
  claveRegistro: string;
  claveRegistro2: string;
  nombreRegistro: string;
  tipoRegistro: string;
  items = ['admin', 'encargado', 'cliente', 'chofer'];

  progreso: number;
  progresoMensaje = "esperando...";
  logeando: boolean = false;
  ProgresoDeAncho: string;
  Mensajes: string;
  spiner: boolean = false;
  spinerRegistro: boolean = false;

  clave: string;
  email: string;
  token: string;

  public reactiveForm: FormGroup;

  constructor(public miHttp: AuthService,
    public builder: FormBuilder,
    public http: Http,
    private router: Router,
    private formBuilder : FormBuilder) {
  }

  ngOnInit() {
  }
  
  formNombre = new FormControl('', [
    Validators.required
  ]);

  formEmail = new FormControl('', [
    Validators.required
  ]);

  formClave = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  formClave2 = new FormControl('', [
    Validators.required,
  ]);
  


  registroForm: FormGroup = this.formBuilder.group({
    nombre: this.formNombre,
    email: this.formEmail,
    clave: this.formClave,
    tipo: "cliente",
    estado: "suspendido"
  });


  enviarLogin() {
    let usuario = {
      'email': this.email,
      'clave': this.clave
    }
    this.spiner = true;
    this.miHttp.login(usuario).then(res => {
      console.log("res2:" + res.msj);
      //this.router.navigate(['/']);
      this.spiner = false;
      alert(res.msj);
      this.router.navigate(['/principal']);

    }).catch(err => {
      this.spiner = false;
      console.log("error capturado: " + err.error);
      alert(err.error);
    });
  }
  



  Registrar() {
    if (this.registroForm.value['nombre'] != null && this.registroForm.value['nombre'] != "") {
      if (this.registroForm.value['email']  != null && this.registroForm.value['email']  != "") {
        if (this.registroForm.value['clave']!= null && this.registroForm.value['clave'].length > 5) {
          if (this.registroForm.value['clave'] == this.formClave2.value ) {
            this.spinerRegistro = true;
            let usuario = {
              'nombre': this.nombreRegistro,
              'email': this.usuarioRegistro,
              'clave': this.claveRegistro,
              'tipo': "cliente",
              'estado': "suspendido"
            }
            this.miHttp.registrarUsuario(this.registroForm.value).then(res => {
              this.spinerRegistro = false;
              alert("registro res: " + res)
              //this.router.navigate(['/']);
              let cerrar = document.getElementById('id01')
              cerrar.style.display = 'none';
            }).catch(err => {
              this.spinerRegistro = false;
              console.log("error capturado: " + err.error);
              alert(err.error)
            });
          } else {
            //return this.MostarMensaje("Las clave no coinciden",false,'msjRegistro');
            alert("Las clave no coinciden");
            console.log("Las clave no coinciden");
          }
        } else {
          //return this.MostarMensaje("Debe ingresar un correo",false,'msjRegistro');
          alert("Contraseña no debe ser menor a 6 caracteres");
          console.log("Contraseña no debe ser menor a 6 caracteres");
        }
      } else {
        //return this.MostarMensaje("Contraseña no debe ser menor a 6 caracteres",false,'msjRegistro');
        alert("Debe ingresar un correo");
        console.log("Debe ingresar un correo");
      }
    }else{
      alert("Debe ingresar un nombre");
      console.log("Debe ingresar un nombre");
    }
  }


    spinerLogin() {

      setTimeout(function () {
        // errorEmail.className = errorEmail.className.replace("show", "");
        this.logeando = false;
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

    MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false, tipo: string) {
      this.Mensajes = mensaje;
      let errorEmail = document.getElementById(tipo);
      if (ganador) {
        errorEmail.innerHTML = (`<h4 id='${tipo}'><kbd class= label-success>${mensaje} <i class="far fa-smile"></i> </kbd></h4>`);
      } else {
        errorEmail.innerHTML = (`<h4 id='${tipo}'><kbd class= label-danger>${mensaje} <i class="far fa-frown"></i></kbd></h4>`);
      }
      var modelo = this;
      setTimeout(function () {
        // errorEmail.className = errorEmail.className.replace("show", "");
        errorEmail.innerHTML = "";
      }, 3000);
      console.info("objeto", errorEmail);

    }

  }

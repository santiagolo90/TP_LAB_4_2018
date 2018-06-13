import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  spinerRegistro: boolean = false;

  constructor(public miHttp: AuthService,
    public http: Http,
    private router: Router,
    private formBuilder : FormBuilder,
    private toastr: ToastrService) {
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

  formTipo = new FormControl('', [
    Validators.required,
  ]);

  formEstado = new FormControl('', [
    Validators.required,
  ]);
  


  registroForm: FormGroup = this.formBuilder.group({
    nombre: this.formNombre,
    email: this.formEmail,
    clave: this.formClave,
    tipo: this.formTipo,
    estado: this.formEstado
  });

  Mostrar(){
    //alert("Usuario Registrado");
    //console.log(this.registroForm.get('tipo').value); 
  }
  Registrar() {
    if (this.registroForm.value['nombre'] != null && this.registroForm.value['nombre'] != "") {
      if (this.registroForm.value['email']  != null && this.registroForm.value['email']  != "") {
        if (this.registroForm.value['clave']!= null && this.registroForm.value['clave'].length > 5) {
          if (this.registroForm.value['clave'] == this.formClave2.value ) {
            this.spinerRegistro = true;
            this.miHttp.registrarUsuario(this.registroForm.value).then(res => {
              this.spinerRegistro = false;
              //alert("registro res: " + res)
              this.router.navigate(['/principal']);
              this.mostarToast(res,"","info")
            }).catch(err => {
              this.spinerRegistro = false;
              console.log("error capturado: " + err.error);
              //alert(err.error)
              this.mostarToast("Error",err.error,"error")
            });
          } else {
            //return this.MostarMensaje("Las clave no coinciden",false,'msjRegistro');
            //alert("Las clave no coinciden");
            this.mostarToast("Las clave no coinciden","","warning")
            console.log("Las clave no coinciden");
          }
        } else {
          //return this.MostarMensaje("Debe ingresar un correo",false,'msjRegistro');
          //alert("Contraseña no debe ser menor a 6 caracteres");
          this.mostarToast("Contraseña menor a 6 caracteres","","warning")
          console.log("Contraseña no debe ser menor a 6 caracteres");
        }
      } else {
        //return this.MostarMensaje("Contraseña no debe ser menor a 6 caracteres",false,'msjRegistro');
        //alert("Debe ingresar un correo");
        this.mostarToast("Debe ingresar un correo","","warning")
        console.log("Debe ingresar un correo");
      }
    }else{
      //alert("Debe ingresar un nombre");
      this.mostarToast("Debe ingresar un nombre","","warning")
      console.log("Debe ingresar un nombre");
    }
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

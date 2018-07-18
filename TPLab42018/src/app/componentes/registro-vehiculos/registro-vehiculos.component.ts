import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { VehiculosService } from '../../servicios/vehiculos.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-vehiculos',
  templateUrl: './registro-vehiculos.component.html',
  styleUrls: ['./registro-vehiculos.component.css']
})
export class RegistroVehiculosComponent implements OnInit {
  mostrarSpinner: boolean = false;

  constructor(public miHttp: AuthService,
    public vechiculoServ: VehiculosService,
    public http: Http,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
  }

  ngOnInit() {
  }
  formPatente = new FormControl('', [
    Validators.required
  ]);

  formTipo = new FormControl('', [
    Validators.required
  ]);

  formMarca = new FormControl('', [
    Validators.required,
  ]);

  formColor = new FormControl('', [
    Validators.required,
  ]);

  // formEstado = new FormControl('', [
  //   Validators.required,
  // ]);


  registroForm: FormGroup = this.formBuilder.group({
    patente: this.formPatente,
    tipo: this.formTipo,
    marca: this.formMarca,
    color: this.formColor,
    estado: "libre"
  });

  Registrar() {
    this.mostrarSpinner = true;
    this.vechiculoServ.registrarVehiculo(this.registroForm.value).then(res => {
      this.router.navigate(['/vehiculos']);
      this.mostarToast(res, "", "info")
      this.mostrarSpinner = false;
    }).catch(err => {
      console.log("error capturado: " + err.error);
      //alert(err.error)
      this.mostarToast("Error", err.error, "error")
      this.mostrarSpinner = false;
    });
  }

  mostarToast(titulo: string, mensaje: string, tipo: string) {
    //ToastrService.success/error/warning/info/show()
    if (tipo == "success") {
      this.toastr.success(mensaje, titulo);
    }
    if (tipo == "error") {
      this.toastr.error(mensaje, titulo);
    }
    if (tipo == "warning") {
      this.toastr.warning(mensaje, titulo);
    }
    if (tipo == "info") {
      this.toastr.info(mensaje, titulo);
    }
    if (tipo == "show") {
      this.toastr.show(mensaje, titulo);
    }

  }

}

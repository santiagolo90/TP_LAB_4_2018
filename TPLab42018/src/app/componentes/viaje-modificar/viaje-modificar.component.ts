import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MapaComponent } from '../mapa/mapa.component';
import {MiCaptchaComponent} from '../mi-captcha/mi-captcha.component'
import {AuthService } from '../../servicios/auth.service'
import {ViajesService } from '../../servicios/viajes.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-viaje-modificar',
  templateUrl: './viaje-modificar.component.html',
  styleUrls: ['./viaje-modificar.component.css']
})
export class ViajeModificarComponent implements OnInit {
  @Input() viaje:any; // nuevo
  title: string = 'My first AGM project';
  idViaje: any;
  latOrigen: number = 0;
  lngOrigen: number = 0;
  latDestino: number = 0;
  lngDestino: number = 0;
  cliente:string = "NN";
  pago:string;
  tipo:string;
  zoom: number = 16;
  nuevoJuego: MiCaptchaComponent


  constructor(private toastr: ToastrService,
              private formBuilder : FormBuilder,
              private miAuth:AuthService,
              private router: Router,
              private viajesService:ViajesService){
               }

  ngOnInit() {
    console.log("id: ", this.viaje);
    this.idViaje = this.viaje.id;
    this.latOrigen = Number(this.viaje.latOrigen);
    this.lngOrigen = Number(this.viaje.lngOrigen);
    this.latDestino = Number(this.viaje.latDestino);
    this.lngDestino = Number(this.viaje.lngDestino);
    this.pago = (this.viaje.pago);
    this.tipo = (this.viaje.tipo);
    console.log("idViaje: ",this.idViaje);
    console.log("latOrigen: ",this.latOrigen);
    console.log("lngOrigen: ",this.lngOrigen);
    console.log("latDestino: ",this.latDestino);
    console.log("lngDestino: ",this.lngDestino);
    console.log("pago: ",this.pago);
    console.log("tipo: ",this.tipo);
  }


  seccionarOrigen(event) {
    let coords = event.coords;
    this.latOrigen = coords.lat;
    this.lngOrigen = coords.lng;
    console.log("Origen: ",event.coords);
    
  }
  seccionarDestino(event) {
    let coords = event.coords;
    this.latDestino = coords.lat;
    this.lngDestino = coords.lng;
    console.log("Destino: ",event.coords);
  }
  cerrarModa(){

  }

  Registrar(){
     let viaje = {
       "id": this.idViaje,
       "pago": this.pago,
       "tipo": this.tipo,
       "latOrigen": this.latOrigen,
       "lngOrigen": this.lngOrigen,
       "latDestino": this.latDestino,
       "lngDestino": this.lngDestino,
     }
    
     /*
       alert("id: "+viaje.id+"\n Pago: "+ viaje.pago+"\n tipo: "+ viaje.tipo
       +"\n latOrigen: "+ viaje.latOrigen
       +"\n lngOrigen: "+ viaje.lngOrigen
       +"\n latDestino: "+ viaje.latDestino
       +"\n lngDestino: "+ viaje.lngDestino);
    */
       
      this.viajesService.modificarViaje(viaje).then(res => {
        this.router.navigate(['/principal']);
        this.mostarToast(res, "", "info")
        let btnCerrarModal = document.getElementById("id02").style.display='none';
      }).catch(err => {
        console.log("error capturado: " + err.error);
        this.mostarToast("Error", err.error, "error")
      });

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

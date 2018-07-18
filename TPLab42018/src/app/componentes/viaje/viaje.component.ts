import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MapaComponent } from '../mapa/mapa.component';
import {MiCaptchaComponent} from '../mi-captcha/mi-captcha.component'
import {AuthService } from '../../servicios/auth.service'
import {ViajesService } from '../../servicios/viajes.service'


@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {

  @Input() id:string; // nuevo
  title: string = 'My first AGM project';
  latOrigen: number = -34.816121;
  lngOrigen: number = -58.470209;
  latDestino: number = -34.816121;
  lngDestino: number = -58.470209;
  cliente:string = "NN";
  //pago:string;
  //tipo:string;
  zoom: number = 16;
  nuevoJuego: MiCaptchaComponent


  constructor(private toastr: ToastrService,
              private formBuilder : FormBuilder,
              private miAuth:AuthService,
              private viajesService:ViajesService){
               }

  ngOnInit() {
    this.nuevoJuego = new MiCaptchaComponent();
    this.nuevoJuego.randomNumeroOperador();
  }


  tipo = new FormControl('', [
    Validators.required,
    //Validators.minLength(6)
  ]);

  pago = new FormControl('', [
    Validators.required,
  ]);

  miNumero = new FormControl(0, [
    Validators.required,
  ]);
  


  registroForm: FormGroup = this.formBuilder.group({
    latOrigen: this.latOrigen,
    lngOrigen: this.lngOrigen,
    latDestino: this.latDestino,
    lngDestino: this.lngDestino,
    tipo: this.tipo,
    pago : this.pago,
    cliente: this.miAuth.getDataID(),
    estado: "pendiente"
  });

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
       "cliente": this.miAuth.getDataID(),
       "estado": "pendiente",
       "pago": this.registroForm.value['pago'],
       "tipo": this.registroForm.value['tipo'],
       "latOrigen": this.latOrigen,
       "lngOrigen": this.lngOrigen,
       "latDestino": this.latDestino,
       "lngDestino": this.lngDestino,
     }
    console.log("calcular: ",this.nuevoJuego.calcular(this.miNumero.value));
    console.log("miNumero: ",this.miNumero.value);
    if (this.nuevoJuego.calcular(this.miNumero.value) == true) {
/*
       alert("cliente: "+viaje.cliente+"\n Pago: "+ viaje.pago+"\n tipo: "+ viaje.tipo
       +"\n latOrigen: "+ viaje.latOrigen
       +"\n lngOrigen: "+ viaje.lngOrigen
       +"\n latDestino: "+ viaje.latDestino
       +"\n lngDestino: "+ viaje.lngDestino);
*/
       
      this.viajesService.registarViaje(viaje).then(res => {
        //this.router.navigate(['/vehiculos']);
        this.mostarToast(res, "", "info")
      }).catch(err => {
        console.log("error capturado: " + err.error);
        this.mostarToast("Error", err.error, "error")
      });

      this.nuevoJuego.randomNumeroOperador();
    }else{
      this.mostarToast("Error","Error en captcha","error")
      this.nuevoJuego.randomNumeroOperador();
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

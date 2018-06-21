import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MapaComponent } from '../mapa/mapa.component';
import {MiCaptchaComponent} from '../mi-captcha/mi-captcha.component'


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
  lngDetino: number = -58.470209;
  cliente:string = "NN";
  //pago:string;
  //tipo:string;
  zoom: number = 16;
  nuevoJuego: MiCaptchaComponent


  constructor(private toastr: ToastrService,
              private formBuilder : FormBuilder){
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
    lngDetino: this.lngDetino,
    tipo: this.tipo,
    pago : this.pago,
    cliente: this.cliente
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
    this.lngDetino = coords.lng;
    console.log("Destino: ",event.coords);
  }
  cerrarModa(){

  }

  Registrar(){
    // let viaje = {
    //   "cliente": this.cliente,
    //   "pago": this.pago,
    //   "tipo": this.tipo,
    //   "latOrigen": this.latOrigen,
    //   "lngOrigen": this.lngOrigen,
    //   "latDestino": this.latDestino,
    //   "lngDetino": this.lngDetino,
    // }
    console.log("calcular: ",this.nuevoJuego.calcular(this.miNumero.value));
    console.log("miNumero: ",this.miNumero.value);
    if (this.nuevoJuego.calcular(this.miNumero.value) == true) {
      let viaje = this.registroForm.value;

      alert("cliente: "+viaje.cliente+"\n Pago: "+ viaje.pago+"\n tipo: "+ viaje.tipo
      +"\n latOrigen: "+ viaje.latOrigen
      +"\n lngOrigen: "+ viaje.lngOrigen
      +"\n latDestino: "+ viaje.latDestino
      +"\n lngDetino: "+ viaje.lngDetino);
      this.nuevoJuego.randomNumeroOperador();
    }else{
      //alert("Error en calculo")
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

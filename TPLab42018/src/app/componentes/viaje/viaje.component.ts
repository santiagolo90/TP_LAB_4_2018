import { Component, OnInit, Input } from '@angular/core';
import { MapaComponent } from '../mapa/mapa.component';
import { Alert } from 'selenium-webdriver';

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
  pago:string;
  tipo:string;
  zoom: number = 16;

  constructor() { }

  ngOnInit() {
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
    this.lngDetino = coords.lng;
    console.log("Destino: ",event.coords);
  }
  cerrarModa(){

  }

  Registrar(){
    let viaje = {
      "cliente": this.cliente,
      "pago": this.pago,
      "tipo": this.tipo,
      "latOrigen": this.latOrigen,
      "lngOrigen": this.lngOrigen,
      "latDestino": this.latDestino,
      "lngDetino": this.lngDetino,

    }

    alert("cliente: "+viaje.cliente+"\n Pago: "+ viaje.pago+"\n tipo: "+ viaje.tipo
    +"\n latOrigen: "+ viaje.latOrigen
    +"\n lngOrigen: "+ viaje.lngOrigen
    +"\n latDestino: "+ viaje.latDestino
    +"\n lngDetino: "+ viaje.lngDetino);
    
  }


}

import { Component, OnInit,AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
//import { Chart } from 'chart.js';
//import { Chart, ChartData, Point } from "chart.js";
import { ViajesService } from '../../servicios/viajes.service'
import { ChoferesService } from '../../servicios/choferes.service'
import { ClientesService } from '../../servicios/clientes.service'
import { EncuestasService } from '../../servicios/encuestas.service'




@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements AfterViewInit {

  canvas: any;
  tipoDePago:any
  porChofer:any
  porMes:any
  ctx: any;
  ctx2: any;
  ctx3: any;
  ctx4: any;
  public misViajes: Array<any> = [];
  contadorNormal:number = 0;
  contadorGrande:number = 0;
  contadorLujoso:number = 0;
  contadorEfectivo:number = 0;
  contadorCC:number = 0;
  public misChoferes: Array<any> = [];
  public misEncuestas: Array<any> = [];

  estado_vehiculo_bueno:number = 0;
  estado_vehiculo_malo:number = 0;

  tiempo_si:number = 0;
  tiempo_no:number = 0;

  dificultad_si:number = 0;
  dificultad_no:number = 0;

  //puntos_chofer:any =0;
  //estado_vehiculo_bueno:any =0;
  //estado_vehiculo_malo:any =0;
  //estado_vehiculo_regular:any =0;

  //buena_persona_si:any =0;
  //buena_persona_no:any =0;

  //imagen_chofer_bueno:any =0;
  //imagen_chofer_mala:any =0;
  //imagen_chofer_regular:any =0;

  //tiempo_si:any=0;
  //tiempo_no:any=0;

  //dificultad_si:any=0;
  //dificultad_no:any=0;
  //dificultad_algo:any=0;


  constructor(public choferServ: ChoferesService,
    private viajesService:ViajesService,
    private encuestasService:EncuestasService,
    public clienteServ: ClientesService) {
}

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: ["Normal", "Grande", "Lujoso"],
          datasets: [{
              label: 'Pedidos por tipo de vehiculo',
              data: [this.contadorNormal,this.contadorGrande,this.contadorLujoso],
              backgroundColor: [
                  'rgba(3, 169, 244, 0.7)',
                  'rgba(244, 67, 54, 0.7)',
                  'rgba(0, 150, 136, 0.7)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        title: {
           display: true,
           text: 'Pedidos por tipo de vehiculo'
         }
        //display:true
      }
    });
  }
  graficoTipoDePagos() {
    this.tipoDePago = document.getElementById('tipoDePago');
    this.ctx2 = this.tipoDePago.getContext('2d');
    let myChart = new Chart(this.ctx2, {
      type: 'pie',
      data: {
        labels: ["Efectivo", "Cuenta corriente"],
          datasets: [{
              label: 'Pedidos por tipo de pago',
              data: [this.contadorEfectivo,this.contadorCC],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        title: {
           display: true,
           text: 'Pedidos por tipo de pago'
         }
        //display:true
      }
    });
  }
  graficoPorChofer() {
    
    this.porChofer = document.getElementById('porChofer');
    this.ctx3 = this.porChofer.getContext('2d');
    let myChart = new Chart(this.ctx3, {
      type: 'doughnut',
      data: {
        labels: ["Estado vehiculo bueno","Estado vehiculo malo","Demoras si","Demoras no","Pedido dificil","Pedido facil"],
          datasets: [{
              label: 'Encuestas de clientes',
              data: [this.estado_vehiculo_bueno,this.estado_vehiculo_malo,this.tiempo_si,this.tiempo_no,this.dificultad_si,this.dificultad_no],
              backgroundColor: [
                  'rgba(3, 169, 244, 0.7)',
                  'rgba(244, 67, 54, 0.7)',
                  'rgba(233, 30, 99, 0.7)',
                  'rgba(156, 39, 176, 0.7)',
                  'rgba(63, 81, 181, 0.7)',
                  'rgba(0, 150, 136, 0.7)',
              ],
              borderWidth: 1
          }],
      },
      
      options: {
        responsive: false,
        title: {
           display: true,
           text: 'Encuestas de clientes'
         }
        //display:true
      }
    });
  }

  ngOnInit() {
    //this.traerChoferes();   
    this.viajesService.traerTodos().then(res => {
      console.log( "viajes: ", res);
      this.misViajes =[];
         res.forEach(element => {
           if (element.tipo =="normal") {
             this.contadorNormal ++;
           }
           if (element.tipo =="grande") {
             this.contadorGrande ++;
             
          }
          if (element.tipo =="lujoso") {
             this.contadorLujoso ++;
          }

          if (element.pago =="efectivo") {
            this.contadorEfectivo ++;
         }
         if (element.pago =="cuenta") {
          this.contadorCC ++;
          }

          
             this.misViajes.push(element);
       });
       this.ngAfterViewInit();
       this.graficoTipoDePagos();
       this.traerEncuestas(); 
       
    }).catch(err => {
      console.log(err);
    });
  }

  traerChoferes(){
    this.choferServ.operacionesSector().then(res => {
      //this.misMascotas = res;
       this.misChoferes =[];
       res.forEach(element => {
        this.misChoferes.push(element);
      });
      console.log( "clientes: ", this.misChoferes);
    }).catch(err => {
      console.log(err);
    });
  }

  traerEncuestas(){
    this.misEncuestas =[];
    this.encuestasService.traerTodos().then(res => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].estado_vehiculo == "bueno") {
          this.estado_vehiculo_bueno = this.estado_vehiculo_bueno + 1;
        }
        if (res[i].estado_vehiculo == "malo") {
          this.estado_vehiculo_malo  = this.estado_vehiculo_malo + 1;
        }
        if (res[i].tiempo == "si") {
          this.tiempo_si = this.tiempo_si + 1;
        }
        if (res[i].tiempo == "no") {
          this.tiempo_no = this.tiempo_no + 1;
        }
        if (res[i].dificultad == "si") {
          this.dificultad_si = this.dificultad_si + 1;
        }
        if (res[i].dificultad == "no") {
          this.dificultad_no = this.dificultad_no + 1;
        }
        
      }      
      // res.forEach(element => {
      //   if (element.estado_encuesta == "finalizada") {
      //     this.misEncuestas.push(element);
      //   }
      // });
      //console.log( "encuestas: ", this.misEncuestas);
      this.graficoPorChofer();
    }).catch(err => {
      console.log("encuestas: ",err);
    });

  }

}

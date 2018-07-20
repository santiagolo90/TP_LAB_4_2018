import { Component, OnInit,AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
//import { Chart } from 'chart.js';
//import { Chart, ChartData, Point } from "chart.js";
import { ViajesService } from '../../servicios/viajes.service'
import { ChoferesService } from '../../servicios/choferes.service'
import { ClientesService } from '../../servicios/clientes.service'




@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements AfterViewInit {

  canvas: any;
  tipoDePago:any
  porChofer:any
  ctx: any;
  ctx2: any;
  ctx3: any;
  public misViajes: Array<any> = [];
  contadorNormal:number = 0;
  contadorGrande:number = 0;
  contadorLujoso:number = 0;
  contadorEfectivo:number = 0;
  contadorCC:number = 0;
  public misChoferes: Array<any> = [];


  constructor(public choferServ: ChoferesService,
    private viajesService:ViajesService,
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
      type: 'pie',
      data: {
        //labels: [this.misChoferes],
          datasets: [{
              label: 'Pedidos por tipo de pago',
              data: [this.contadorEfectivo,this.contadorCC],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
          }],
          
      },
      
      options: {
        responsive: false,
        title: {
           display: true,
           text: 'Pedidos por chofer'
         }
        //display:true
      }
    });
  }
  

  ngOnInit() {
    this.traerChoferes();
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
       this.graficoPorChofer();
    }).catch(err => {
      console.log(err);
    });
  //   this.chart = new Chart(document.getElementById('canvas'), {
  //     type: 'doughnut',
  //     data: {
  //       labels: ["Bartender", "Cerveceria", "Cocina"],
  //       datasets: [
  //         {
  //           label: "Cantidad de pedidos",
  //           backgroundColor: ["#f3c83b", "#000000","#f3f3f3"],
  //           data: [
  //               10,
  //               20,
  //               30
  //             ],
  //         }
  //       ]
  //     },
  //     options: {
  //       legend: { display: false },
  //       title: {
  //         display: true,
  //         text: 'Pedidos por sector'
  //       }
  //     }
  // });
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

}

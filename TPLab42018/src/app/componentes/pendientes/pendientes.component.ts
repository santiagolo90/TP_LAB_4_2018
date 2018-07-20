import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator } from '@angular/material';
import { SpinnerService } from '../../servicios/spinner.service';
import * as jsPDF from 'jspdf'
//declare var jsPDF: any; // Important
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ViajesService } from '../../servicios/viajes.service'
import { VehiculosService } from '../../servicios/vehiculos.service'
import { AuthService } from '../../servicios/auth.service'
import { ChoferesService } from '../../servicios/choferes.service'
import { MapaComponent } from '../mapa/mapa.component'
import { MiAlertComponent } from '../mi-alert/mi-alert.component'

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {

  private paginator: MatPaginator;
  private sort: MatSort;
  mostrarSpinner: boolean = false;
  public misViajes: Array<any> = [];
  tipo: string = "todos"
  matDialogRef: MatDialogRef<any>;

  public miVehiculo: any;

  constructor(public miHttp: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public choferServ: ChoferesService,
    private viajesService: ViajesService,
    private vehiculosService: VehiculosService,
    private spinner: SpinnerService,
    private toastr: ToastrService,
    private matDialog: MatDialog) {
  }

  displayedColumns = ['fecha', 'hora', 'tipo','pago','cliente','ruta','precio','Accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.dataSource.sort = ms;
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }

  ngOnInit() {
    let chofer = {
      "patente": this.miHttp.getDataPatente()
    }
    this.mostrarSpinner = true;
    this.vehiculosService.traerUno(chofer).then(res => {
      this.miVehiculo = res;
      console.log("viajes: ", res);
      this.mostrarSpinner = false;
      this.mostrarGrilla();
    }).catch(err => {
      console.log(err);
      this.mostrarSpinner = false;
    });
  }

  mostrarGrilla() {
    this.mostrarSpinner = true;
    this.viajesService.traerTodos().then(res => {
      console.log("viajes: ", res);
      this.misViajes = [];
      res.forEach(element => {
        if (element.estado == "pendiente" || element.estado == "en curso") {
          if (element.chofer == this.miHttp.getDataID() || element.chofer == null) {
            if (element.tipo == this.miVehiculo.tipo) {
              this.misViajes.push(element);
              this.dataSource = new MatTableDataSource(this.misViajes);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }
          }
        }
      });
      this.mostrarSpinner = false;
    }).catch(err => {
      console.log(err);
      this.mostrarSpinner = false;
    });
  }

  verRuta(elemento:any){
    console.log("Elemento: ",elemento);
    console.log("Elemento: ",elemento.fecha);

    let dialogRef = this.matDialog.open(MapaComponent, {
      height: '400px',
      width: '600px',
      data : {
        hidenButtons : true,
        title : 'Seleccionar destino',
        showRuta : true,
        origen : {

            lat : Number(elemento.latOrigen),
            lng : Number(elemento.lngOrigen)
        },
        destino : {

            lat : Number(elemento.latDestino),
            lng : Number(elemento.lngDestino)
        }
    }});
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.mostrarGrilla();
        //this.mostarToast("se modifico chofer","","success")
      }
     });
    
  }

  tomarViaje(idAux:any){
    let viaje = {
      "id": idAux,
      "chofer": this.miHttp.getDataID(),
      "estado": "en curso"
    }

    this.mostrarSpinner = true;
    this.viajesService.tomarViaje(viaje).then(res => {
      console.log( "tomo viaje: ", res);
      this.mostarToast(res,"","success")
       this.mostrarSpinner = false;
       this.mostrarGrilla();
    }).catch(err => {
      console.log(err);
      this.mostarToast("Error al tomar viaje","","error")
      this.mostrarSpinner = false;
    });
  
  }

  finalizarViaje(idAux:any){
      //alert(patenteAux);
      let dialogRef = this.matDialog.open(MiAlertComponent, {
        height: '250px',
        width: '400px',
        data : {
        tipo : "finalizar"
      }});
      dialogRef.afterClosed().subscribe(res => {
        //alert("precio: "+res)
        if (res > 0) {
          let viaje = {
            "id": idAux,
            "chofer": this.miHttp.getDataID(),
            "estado": "finalizado",
            "precio": res
          }
      
          this.mostrarSpinner = true;
          this.viajesService.tomarViaje(viaje).then(res => {
            console.log( "tomo viaje: ", res);
            this.mostarToast("Se finalizo correctamente","","success")
             this.mostrarSpinner = false;
          }).catch(err => {
            console.log(err);
            this.mostarToast("Error al finalizar viaje","","error")
            this.mostrarSpinner = false;
          });
        }else{
          this.mostarToast("Error al finalizar viaje","","warning")
        }
       });
       this.mostrarGrilla();

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

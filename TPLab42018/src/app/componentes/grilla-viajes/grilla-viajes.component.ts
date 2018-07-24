import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { ChoferesService } from '../../servicios/choferes.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator } from '@angular/material';
import { SpinnerService } from '../../servicios/spinner.service';
import * as jsPDF from 'jspdf'
//declare var jsPDF: any; // Important
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChoferComponent } from '../chofer/chofer.component';
import { ClientesService } from '../../servicios/clientes.service';
import { ViajesService } from '../../servicios/viajes.service'
import { MapaComponent } from '../mapa/mapa.component'
import { MiAlertComponent } from '../mi-alert/mi-alert.component';
import { EncuestaComponent } from '../encuesta/encuesta.component';


@Component({
  selector: 'app-grilla-viajes',
  templateUrl: './grilla-viajes.component.html',
  styleUrls: ['./grilla-viajes.component.css']
})
export class GrillaViajesComponent implements OnInit {

  private paginator: MatPaginator;
  private sort: MatSort;
  mostrarSpinner: boolean = false;
  public misViajes: Array<any> = [];
  tipo:string = "todos"
  matDialogRef : MatDialogRef<any>;
  public misClientes: Array<any> = [];

  constructor(public miHttp: AuthService,
    public http: Http,
    private router: Router,
    private formBuilder : FormBuilder,
    public choferServ: ChoferesService,
    private viajesService:ViajesService,
    private spinner : SpinnerService,
    private toastr: ToastrService,
    private matDialog : MatDialog,
    public clienteServ: ClientesService) {
}

displayedColumns :any;
dataSource = new MatTableDataSource(); 

@ViewChild(MatSort) set matSort(ms: MatSort) {
    this.dataSource.sort = ms;
}

@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
}


  ngOnInit() {
    this.misClientes = [];
    this.traerClientes();
    if (this.miHttp.getDataTipo() == "encargado" || this.miHttp.getDataTipo() == "admin"  ) {
      this.displayedColumns = [ 'fecha', 'hora', 'tipo','pago', 'estado','cliente','chofer','ruta','precio'];
      this.mostrarGrilla();
    }
    if (this.miHttp.getDataTipo() == "cliente") {
      this.displayedColumns = [ 'fecha', 'hora', 'tipo','pago', 'estado','chofer','ruta','precio','Accion'];
      this.mostrarGrillaClientes();
    }
    if (this.miHttp.getDataTipo() == "chofer") {
      this.displayedColumns = [ 'fecha', 'hora', 'tipo','pago', 'estado','cliente','ruta','precio'];
      this.mostrarGrillaChofer();
    }
    
  }

  mostrarGrilla(){
    this.mostrarSpinner = true; 
    this.viajesService.traerTodos().then(res => {
      //this.misMascotas = res;
      console.log( "viajes: ", res);
      this.misViajes =[];
       if (this.tipo == "todos") {
         //this.misViajes = res;
         res.forEach(element => {
          for (let i = 0; i < this.misClientes.length; i++) {
           if (element.cliente == this.misClientes[i].id) {
             element.cliente = this.misClientes[i].nombre;
           }
           if (element.chofer == this.misClientes[i].id) {
            element.chofer = this.misClientes[i].nombre;
            }
          }
             this.misViajes.push(element);
       });
       }else{
         res.forEach(element => {
           if (element.estado === this.tipo) {
            for (let i = 0; i < this.misClientes.length; i++) {
              if (element.cliente == this.misClientes[i].id) {
                element.cliente = this.misClientes[i].nombre;
              }
              if (element.chofer == this.misClientes[i].id) {
                element.chofer = this.misClientes[i].nombre;
              }
             }
               this.misViajes.push(element);
           }
         });
       }
       this.dataSource = new MatTableDataSource(this.misViajes);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
       this.mostrarSpinner = false;
    }).catch(err => {
      console.log(err);
      this.mostrarSpinner = false;
    });
  }

  mostrarGrillaClientes(){
    let cliente = {
      "cliente": this.miHttp.getDataID()
    }
    this.mostrarSpinner = true;
    this.viajesService.traerPorCliente(cliente).then(res => {
      console.log( "viajes: ", res);
       this.misViajes =[];
        if (this.tipo == "todos") {
          res.forEach(element => {
          if (element.cliente == this.miHttp.getDataID()) {
            for (let i = 0; i < this.misClientes.length; i++) {
              if (element.cliente == this.misClientes[i].id) {
                element.cliente = this.misClientes[i].nombre;
              }
              if (element.chofer == this.misClientes[i].id) {
               element.chofer = this.misClientes[i].nombre;
               }
             }
              this.misViajes.push(element);
          }
        });
        }
        if (this.tipo != "todos") {
          res.forEach(element => {
            if (element.estado == this.tipo) {
              if (element.cliente == this.miHttp.getDataID()) {
                for (let i = 0; i < this.misClientes.length; i++) {
                  if (element.cliente == this.misClientes[i].id) {
                    element.cliente = this.misClientes[i].nombre;
                  }
                  if (element.chofer == this.misClientes[i].id) {
                   element.chofer = this.misClientes[i].nombre;
                   }
                 }
                this.misViajes.push(element);
              }
            }
          });
        }
        this.dataSource = new MatTableDataSource(this.misViajes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       this.mostrarSpinner = false;
    }).catch(err => {
      console.log(err);
      this.mostrarSpinner = false;
    });
  }

  mostrarGrillaChofer(){
    let chofer = {
      "chofer": this.miHttp.getDataID()
    }
    this.mostrarSpinner = true;
    this.viajesService.traerPorChofer(chofer).then(res => {
      console.log( "viajes: ", res);
       this.misViajes =[];
       if (this.tipo == "todos") {
        res.forEach(element => {
        if (element.chofer == this.miHttp.getDataID()) {
          for (let i = 0; i < this.misClientes.length; i++) {
            if (element.cliente == this.misClientes[i].id) {
              element.cliente = this.misClientes[i].nombre;
            }
            if (element.chofer == this.misClientes[i].id) {
             element.chofer = this.misClientes[i].nombre;
           }
           }
            this.misViajes.push(element);
        }
      });
      }
      if (this.tipo != "todos") {
        res.forEach(element => {
          if (element.estado == this.tipo) {
            if (element.chofer == this.miHttp.getDataID()) {
              for (let i = 0; i < this.misClientes.length; i++) {
                if (element.cliente == this.misClientes[i].id) {
                  element.cliente = this.misClientes[i].nombre;
                }
                if (element.chofer == this.misClientes[i].id) {
                 element.chofer = this.misClientes[i].nombre;
               }
               }
              this.misViajes.push(element);

            }
          }
        });
      }
      this.dataSource = new MatTableDataSource(this.misViajes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
       this.mostrarSpinner = false;
    }).catch(err => {
      console.log(err);
      this.mostrarSpinner = false;
    });
  }

  //Pruebas para Angular Material
  applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  verRuta(elemento:any){
      console.log("Elemento: ",elemento);
      console.log("Elemento: ",elemento.fecha);

      let dialogRef = this.matDialog.open(MapaComponent, {
        height: '448px',
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

  traerClientes(){
      this.clienteServ.traerTodosTodos().then(res => {
           res.forEach(element => {
            this.misClientes.push(element);
           });
           console.log("mis clientes: ",this.misClientes);
           
      }).catch(err => {
        console.log(err);
  
      });
  }

  cancelarViaje(idAux:any){

    let dialogRef = this.matDialog.open(MiAlertComponent, {
      height: '150px',
      width: '360px',
      data : {
      tipo : "confirmar"
    }});
    dialogRef.afterClosed().subscribe(res => {
      //alert("precio: "+res)
      if (res == true) {
        let viaje = {
          "id": idAux,
          "estado": "cancelado",
        }
        this.viajesService.cancelarViaje(viaje).then(res => {
          console.log( "cancelo viaje: ", res);
           this.mostrarSpinner = false;
           this.mostarToast("El viaje fue cancelado","","info")
           this.ngOnInit();
        }).catch(err => {
          console.log(err);
          this.mostarToast("Error al cancelar viaje","","warning")
          this.mostrarSpinner = false;
        });
      }else{
        console.log( " no cancelo viaje: ");
      }
     });
  }

  encuesta(idAux:any){

    let dialogRef = this.matDialog.open(EncuestaComponent, {
      height: '600px',
      width: '800px',
      data : {
      tipo : "confirmar"
    }});
    dialogRef.afterClosed().subscribe(res => {
      //alert("precio: "+res)

     });
  }

  modificarViaje(idAux:any){
    // <app-viaje></app-viaje>
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

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
import { EncuestasService } from '../../servicios/encuestas.service'
import { GlobalService } from '../../servicios/global.service'

@Component({
  selector: 'app-grilla-encuestas',
  templateUrl: './grilla-encuestas.component.html',
  styleUrls: ['./grilla-encuestas.component.css']
})
export class GrillaEncuestasComponent implements OnInit {

  private paginator: MatPaginator;
  private sort: MatSort;
  mostrarSpinner: boolean = false;
  public misViajes: Array<any> = [];
  tipo:string = "todos"
  matDialogRef : MatDialogRef<any>;
  public misClientes: Array<any> = [];
  public misEncuestas: Array<any> = [];

  php:string ="nada";

  constructor(public miHttp: AuthService,
              public http: Http,
              private router: Router,
              private formBuilder : FormBuilder,
              public choferServ: ChoferesService,
              private viajesService:ViajesService,
              private spinner : SpinnerService,
              private toastr: ToastrService,
              private matDialog : MatDialog,
              private global:GlobalService,
              private encuestasService:EncuestasService,
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
    this.displayedColumns = [ 'viaje', 'estado', 'chofer','puntos', 'vehiculo' ,'buenaPersona','imagen','demoras','recomendaria','dificultad','comentario'];
    this.mostrarGrilla()
  }

  mostrarGrilla(){
    this.mostrarSpinner = true; 
    this.encuestasService.traerTodos().then(res => {
      console.log( "encuestas: ", res);
      this.misEncuestas =[];
      if (this.tipo == "todos") {
        res.forEach(element => {
        //  for (let i = 0; i < this.misClientes.length; i++) {
        //   if (element.chofer == this.misClientes[i].id) {
        //    element.chofer = this.misClientes[i].nombre;
        //    }
        //  }
            this.misEncuestas.push(element);
      });
      }
      else{
        res.forEach(element => {
          if (element.estado_encuesta === this.tipo) {
          //  for (let i = 0; i < this.misClientes.length; i++) {
          //    if (element.chofer == this.misClientes[i].id) {
          //      element.chofer = this.misClientes[i].nombre;
          //    }
          //   }
          this.misEncuestas.push(element);
          }
        });
      }
      this.dataSource = new MatTableDataSource(this.misEncuestas);
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

  exportar(formato:string){
    console.log("paginado: ",this.misEncuestas);
    if (formato == "excel") {
      this.php = this.global.url+"excel/encuestas/";
    }
    if (formato == "pdf") {

      var columns = [
        {title: "idViaje", dataKey: "idViaje"}, 
        {title: "estado_encuesta", dataKey: "estado_encuesta"}, 
        {title: "chofer", dataKey: "chofer"},
        {title: "puntos_chofer", dataKey: "puntos_chofer"}, 
        {title: "estado_vehiculo", dataKey: "estado_vehiculo"}, 
        {title: "buena_persona", dataKey: "buena_persona"},
        {title: "imagen_chofer", dataKey: "imagen_chofer"}, 
        {title: "tiempo", dataKey: "tiempo"}, 
        {title: "recomendaria", dataKey: "recomendaria"}, 
        {title: "dificultad", dataKey: "dificultad"},
        {title: "comentario", dataKey: "comentario"}, 
        // {title: "lngDestino", dataKey: "lngDestino"}, 
  
      ];
      // Only pt supported (not mm or in)
      var doc = new jsPDF('landscape');
      doc.autoTable(columns, this.misEncuestas );

      doc.save('table.pdf');
    }
  }

}

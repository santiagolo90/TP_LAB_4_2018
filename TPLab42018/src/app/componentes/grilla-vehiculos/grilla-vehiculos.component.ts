import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { GlobalService } from '../../servicios/global.service'
import { ChoferesService } from '../../servicios/choferes.service'
import { VehiculosService } from '../../servicios/vehiculos.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator } from '@angular/material';
import { SpinnerService } from '../../servicios/spinner.service';
import * as jsPDF from 'jspdf'
//declare var jsPDF: any; // Important
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grilla-vehiculos',
  templateUrl: './grilla-vehiculos.component.html',
  styleUrls: ['./grilla-vehiculos.component.css']
})
export class GrillaVehiculosComponent implements OnInit {

  private paginator: MatPaginator;
  private sort: MatSort;
  mostrarSpinner: boolean = false;
  public misVehiculos: Array<any> = [];
  miM:any;
  tipo:string = "todos"
  php:string ="nada";
  

  constructor(public miHttp: AuthService,
    public http: Http,
    private router: Router,
    private formBuilder : FormBuilder,
    public global: GlobalService,
    public choferServ: ChoferesService,
    public vehiculoServ: VehiculosService,
    private spinner : SpinnerService,
    private toastr: ToastrService,) {
  }
  displayedColumns = ['id', 'patente', 'tipo', 'marca','color','estado', 'Accion'];
  dataSource = new MatTableDataSource(); 
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.dataSource.sort = ms;
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }

  ngOnInit() {
    this.mostrarGrilla();
    //this.spinner.showSpinner();
  }

  mostrarGrilla(){
    this.mostrarSpinner = true;
    this.vehiculoServ.traerTodosVehiculos().then(res => {
      //this.misMascotas = res;
      console.log( "clientes: ", res);
      
       this.misVehiculos =[];
       if (this.tipo == "todos") {
         this.misVehiculos = res;
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
       }else{
         res.forEach(element => {
           if (element.estado == this.tipo) {
               this.misVehiculos.push(element);
               this.dataSource = new MatTableDataSource(this.misVehiculos);
               this.dataSource.sort = this.sort;
               this.dataSource.paginator = this.paginator;
           }
         });
       }
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


 activarSuspender(miID:number, accion:string){
  //alert(id + accion)
  let usuario = {id:miID}
  return this.vehiculoServ.activarSuspenderChofer(accion,usuario).then( data => {
   console.log(  data );
   this.mostarToast(data,"","success")
   this.mostrarGrilla();
 })
 .catch( err => {
   console.log( err );
   this.mostarToast(err,"","warning")
   return null;
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


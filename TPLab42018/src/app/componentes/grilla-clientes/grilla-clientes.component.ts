import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { GlobalService } from '../../servicios/global.service'
import { ClientesService } from '../../servicios/clientes.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator } from '@angular/material';
import { SpinnerService } from '../../servicios/spinner.service';
import * as jsPDF from 'jspdf'
//declare var jsPDF: any; // Important
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grilla-clientes',
  templateUrl: './grilla-clientes.component.html',
  styleUrls: ['./grilla-clientes.component.css']
})
export class GrillaClientesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  mostrarSpinner: boolean = false;
  public misChoferes: Array<any> = [];
  miM:any;
  tipo:string = "todos"
  php:string ="nada";
  

  constructor(public miHttp: AuthService,
    public http: Http,
    private router: Router,
    private formBuilder : FormBuilder,
    public global: GlobalService,
    public clienteServ: ClientesService,
    private spinner : SpinnerService,
    private toastr: ToastrService,) {
  }
  displayedColumns = ['id', 'nombre', 'email', 'estado', 'Accion'];
  dataSource = new MatTableDataSource(); 

  ngOnInit() {
    this.mostrarGrilla();
    //this.spinner.showSpinner();
  }

  mostrarGrilla(){
    this.mostrarSpinner = true;
    this.clienteServ.traerTodos().then(res => {
      //this.misMascotas = res;
      console.log( "clientes: ", res);
      
       this.misChoferes =[];
       if (this.tipo == "todos") {
         this.misChoferes = res;
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
       }else{
         res.forEach(element => {
           if (element.estado == this.tipo) {
               this.misChoferes.push(element);
               this.dataSource = new MatTableDataSource(this.misChoferes);
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
  return this.clienteServ.activarSuspenderCliente(accion,usuario).then( data => {
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

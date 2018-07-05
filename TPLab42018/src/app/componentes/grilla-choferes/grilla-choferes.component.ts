import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { GlobalService } from '../../servicios/global.service'
import { ChoferesService } from '../../servicios/choferes.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { MatTableDataSource, MatSort, MatSortable, MatPaginator } from '@angular/material';
import { SpinnerService } from '../../servicios/spinner.service';
import * as jsPDF from 'jspdf'
//declare var jsPDF: any; // Important
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grilla-choferes',
  templateUrl: './grilla-choferes.component.html',
  styleUrls: ['./grilla-choferes.component.css']
})
export class GrillaChoferesComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  mostrarSpinner: boolean = false;
  public misClientes: Array<any> = [];
  public misClientes2: Array<any> = [];
  miM:any;
  tipo:string = "todos"
  php:string ="nada";
  

  constructor(public miHttp: AuthService,
    public http: Http,
    private router: Router,
    private formBuilder : FormBuilder,
    public global: GlobalService,
    public choferServ: ChoferesService,
    private spinner : SpinnerService,
    private toastr: ToastrService,) {
  }
  displayedColumns = ['id', 'nombre', 'email', 'estado','patente', 'Accion'];
  dataSource = new MatTableDataSource(); 

  ngOnInit() {
    this.mostrarGrilla();
    //this.spinner.showSpinner();
  }

  mostrarGrilla(){
    this.mostrarSpinner = true;
    this.choferServ.traerTodos().then(res => {
      //this.misMascotas = res;
      console.log( "clientes: ", res);
      
       this.misClientes =[];
       if (this.tipo == "todos") {
         this.misClientes = res;
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
       }else{
         res.forEach(element => {
           if (element.estado == this.tipo) {
               this.misClientes.push(element);
               this.dataSource = new MatTableDataSource(this.misClientes);
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
  return this.choferServ.activarSuspenderChofer(accion,usuario).then( data => {
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

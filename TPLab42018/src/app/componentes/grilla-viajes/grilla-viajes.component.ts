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
import { ViajesService } from '../../servicios/viajes.service'
import { MapaComponent } from '../mapa/mapa.component'


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

  constructor(public miHttp: AuthService,
    public http: Http,
    private router: Router,
    private formBuilder : FormBuilder,
    public choferServ: ChoferesService,
    private viajesService:ViajesService,
    private spinner : SpinnerService,
    private toastr: ToastrService,
    private matDialog : MatDialog) {
}

displayedColumns = ['id', 'fecha', 'hora', 'tipo','pago', 'estado','cliente','chofer','ruta','precio'];
dataSource = new MatTableDataSource(); 

@ViewChild(MatSort) set matSort(ms: MatSort) {
    this.dataSource.sort = ms;
}

@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
}


  ngOnInit() {
    this.mostrarGrilla();
  }

  mostrarGrilla(){
    this.mostrarSpinner = true;
    this.viajesService.traerTodos().then(res => {
      //this.misMascotas = res;
      console.log( "viajes: ", res);
      
       this.misViajes =[];
       if (this.tipo == "todos") {
         this.misViajes = res;
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
       }else{
         res.forEach(element => {
           if (element.estado == this.tipo) {
               this.misViajes.push(element);
               this.dataSource = new MatTableDataSource(this.misViajes);
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

}

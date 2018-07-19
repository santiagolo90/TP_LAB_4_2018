import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChoferesService } from '../../servicios/choferes.service'
import { VehiculosService } from '../../servicios/vehiculos.service'

@Component({
  selector: 'app-mi-alert',
  templateUrl: './mi-alert.component.html',
  styleUrls: ['./mi-alert.component.css']
})
export class MiAlertComponent implements OnInit {

  precio : number = 0;

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
    if (this.data.tipo == "finalizar") {
      
    }
  }

  enviarValor() {
    if(this.precio && this.precio > 0) {
      this.dialogRef.close(this.precio);
    } else {
      console.log("precio mayor a 0");

    }
  }

  

}

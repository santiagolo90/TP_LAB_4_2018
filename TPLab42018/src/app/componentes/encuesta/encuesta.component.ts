import { Component, OnInit, Input,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../servicios/auth.service'
import { UsuarioService } from '../../servicios/usuario.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  precio : number = 0;

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  enviarValor() {
    if(this.precio && this.precio > 0) {
      this.dialogRef.close(this.precio);
    } else {
      console.log("precio mayor a 0");

    }
  }
  confirmar(valor:boolean) {
    if(valor == true) {
      this.dialogRef.close(valor);
    }
  }

}

import { Component, OnInit, Input,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../servicios/auth.service'
import { UsuarioService } from '../../servicios/usuario.service'
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EncuestasService } from '../../servicios/encuestas.service'

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  precio : number = 0;
  puntos_chofer:string = "";
  estado_vehiculo:string = "bueno";
  buena_persona:string = "no";
  imagen_chofer:string = "";
  tiempo:string= "";
  recomendaria:string= "no";
  dificultad:string = "";
  comentario:string = "sin comentario";

  constructor(private encuestasService:EncuestasService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  temp(valor:any){    
    console.log("valor: ",valor);
    console.log("puntos_chofer: ",this.puntos_chofer);
    console.log("imagen_chofer: ",this.imagen_chofer);
    console.log("tiempo: ",this.tiempo);
    console.log("dificultad: ",this.dificultad);
    
  }
  pruebaRadio(datosAutoLogin:string){
    switch(datosAutoLogin) {
      case 'malo' :
      this.estado_vehiculo = "malo"
      break;
      case 'bueno' :
      this.estado_vehiculo = "bueno"
      break;
      case 'regular' : 
      this.estado_vehiculo = "regular"
      break;
    }
    console.log("estado_vehiculo: ",this.estado_vehiculo);
  }
  pruebaCheckbox(){
    let checkboxBuenaPersona = <any> document.getElementById("checkboxBuenaPersona");  
    let checkboxRecomendaria = <any> document.getElementById("checkboxRecomendaria");  
    if (checkboxBuenaPersona.checked) { 
      this.buena_persona ="si";
    }else{
      this.buena_persona ="no";
    }
    if (checkboxRecomendaria.checked) { 
      this.recomendaria ="si";
    }else{
      this.recomendaria ="no";
    }
    console.log("buena_persona: ",this.buena_persona);
    console.log("recomendaria: ",this.recomendaria);
  }

  Enviar(){
    //this.comentario = <any> document.getElementById("comentario");

    let checkboxBuenaPersona = <any> document.getElementById("checkboxBuenaPersona");  
    let checkboxRecomendaria = <any> document.getElementById("checkboxRecomendaria");

    if (checkboxBuenaPersona.checked) { 
      this.buena_persona ="si";
    }else{
      this.buena_persona ="no";
    }
    if (checkboxRecomendaria.checked) { 
      this.recomendaria ="si";
    }else{
      this.recomendaria ="no";
    }
    //this.comentario = comentarioAux;
    let encuesta ={
      "idViaje": this.data.idViaje,
      "estado_encuesta": "finalizada",
      "puntos_chofer": this.puntos_chofer,
      "estado_vehiculo": this.estado_vehiculo,
      "buena_persona" : this.buena_persona,
      "imagen_chofer" : this. imagen_chofer,
      "tiempo" :this.tiempo,
      "recomendaria": this.recomendaria,
      "dificultad": this.dificultad,
      "comentario": this.comentario
    }
    console.log("Encuestas: ",JSON.stringify(encuesta));
    
    
    this.encuestasService.finalizarEncuesta(encuesta).then(res => {
      console.log( "finalizar encuesta: ", res);
      this.dialogRef.close(true);
    }).catch(err => {
      console.log("error al finalizar: ",err);
      this.dialogRef.close(false);
    });
    
    
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

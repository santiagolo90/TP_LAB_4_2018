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
  foto1:any;
  foto2:any;
  foto3:any;

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
      "comentario": this.comentario,
      "foto1": this.foto1,
      "foto2": this.foto2,
      "foto3": this.foto3
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

  onUploadChange1(evt: any) {
    const file = evt.target.files[0];
    console.log("file", file);
    if (file.size > 197079 ) {
      this.mostarToast("Error", "la imagen debe ser menor a 200kb" ,"warning")
      
    }else{
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(file);
    }
    
  }
  handleReaderLoaded1(e) {
    this.foto1 = 'data:image/png;base64,' + btoa(e.target.result);
    //this.foto1 = btoa(e.target.result);
    //console.log(this.foto1);
  }

  onUploadChange2(evt: any) {
    const file = evt.target.files[0];
    if (file.size > 197079 ) {
      this.mostarToast("Error", "la imagen debe ser menor a 200kb" ,"warning")
      
    }else{
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded2.bind(this);
      reader.readAsBinaryString(file);
    }
    
  }
  handleReaderLoaded2(e) {
    this.foto2 = 'data:image/png;base64,' + btoa(e.target.result);

    //console.log(this.foto2);
  }

  onUploadChange3(evt: any) {
    const file = evt.target.files[0];
    if (file.size > 197079 ) {
      this.mostarToast("Error", "la imagen debe ser menor a 200kb" ,"warning")
      
    }else{
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded3.bind(this);
      reader.readAsBinaryString(file);
    }
    
  }
  handleReaderLoaded3(e) {
    this.foto3 = 'data:image/png;base64,' + btoa(e.target.result);
    //console.log(this.foto3);
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

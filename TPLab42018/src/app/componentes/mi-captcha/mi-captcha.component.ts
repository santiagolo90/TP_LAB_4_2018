import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-captcha',
  templateUrl: './mi-captcha.component.html',
  styleUrls: ['./mi-captcha.component.css']
})
export class MiCaptchaComponent implements OnInit {
  public numeroUno:number;
  public numeroUnoIMG:string ="../../../assets/imagenes/mate/duda.gif";
  public numeroDos:number;
  public numeroDosIMG:string="../../../assets/imagenes/mate/duda.gif";
  public operador:string;
  public operadorAux:number;
  public operadorIMG:string = "../../../assets/imagenes/mate/sumar.gif";
  public resultado:number;
  public respuesta:boolean;

  constructor() { }

  ngOnInit() {
  }

  randomNumeroOperador(){
    this.numeroUno = Math.floor( Math.random()*10)+1;
    this.numeroUnoIMG ="../../../assets/imagenes/mate/"+this.numeroUno+".gif"
    this.numeroDos = Math.floor( Math.random()*10)+1;
    this.numeroDosIMG ="../../../assets/imagenes/mate/"+this.numeroDos+".gif"
    //this.operadorAux = Math.floor( Math.random()*4)+1;
    this.operadorIMG = "../../../assets/imagenes/mate/sumar.gif"
    this.resultado = this.numeroUno + this.numeroDos;

    // switch (this.operadorAux) {
    // 	case 1:
    // 		this.operador = "+";
    //         this.operadorIMG ="../../../assets/imagenes/mate/sumar.gif"
    // 		this.resultado = this.numeroUno + this.numeroDos;
    // 		break;
    // 	case 2:
    // 		this.operador = "-";
    //         this.operadorIMG ="../../../assets/imagenes/mate/restar.gif"
    // 		this.resultado = this.numeroUno - this.numeroDos;
    // 		break;	
    // 	}
  }
  
  calcular(numeroAux:any):boolean{
    if(this.resultado == numeroAux){
        return true;
    }else{
        return false;
    }
  }
}
